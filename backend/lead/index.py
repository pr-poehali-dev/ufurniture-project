import json
import os
import smtplib
import urllib.request
import urllib.parse
from email.mime.text import MIMEText
from email.header import Header


def handler(event: dict, context) -> dict:
    '''Приём заявок с сайта мебельной фабрики: отправка на email и в Telegram'''
    method = event.get('httpMethod', 'GET')

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': {**cors, 'Access-Control-Max-Age': '86400'}, 'body': ''}

    if method != 'POST':
        return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}

    body = json.loads(event.get('body') or '{}')
    name = str(body.get('name', '')).strip()
    phone = str(body.get('phone', '')).strip()
    email = str(body.get('email', '')).strip()
    message = str(body.get('message', '')).strip()

    if not name or not phone:
        return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Укажите имя и телефон'})}

    text_lines = [
        'Новая заявка с сайта ATELIER (Уфа)',
        '',
        f'Имя: {name}',
        f'Телефон: {phone}',
        f'E-mail: {email or "—"}',
        f'Сообщение: {message or "—"}',
    ]
    text = '\n'.join(text_lines)

    errors = []

    # Email
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_user = os.environ.get('SMTP_USER')
    smtp_pass = os.environ.get('SMTP_PASSWORD')
    mail_to = os.environ.get('MAIL_TO')
    if smtp_host and smtp_user and smtp_pass and mail_to:
        try:
            msg = MIMEText(text, 'plain', 'utf-8')
            msg['Subject'] = Header('Новая заявка с сайта ATELIER', 'utf-8')
            msg['From'] = smtp_user
            msg['To'] = mail_to
            with smtplib.SMTP_SSL(smtp_host, 465, timeout=15) as server:
                server.login(smtp_user, smtp_pass)
                server.sendmail(smtp_user, [mail_to], msg.as_string())
        except Exception as e:
            errors.append(f'email: {str(e)}')

    # Telegram
    tg_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    tg_chat = os.environ.get('TELEGRAM_CHAT_ID')
    if tg_token and tg_chat:
        try:
            url = f'https://api.telegram.org/bot{tg_token}/sendMessage'
            data = urllib.parse.urlencode({'chat_id': tg_chat, 'text': text}).encode()
            req = urllib.request.Request(url, data=data, method='POST')
            urllib.request.urlopen(req, timeout=15)
        except Exception as e:
            errors.append(f'telegram: {str(e)}')

    return {
        'statusCode': 200,
        'headers': cors,
        'body': json.dumps({'success': True, 'warnings': errors}, ensure_ascii=False),
    }
