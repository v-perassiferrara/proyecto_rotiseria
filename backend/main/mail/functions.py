from .. import mailsender  # el que cree en el init
from flask import current_app, render_template
from flask_mail import Message
from smtplib import SMTPException  # Viene con flask



def sendMail(to, subject, template, **kwargs):
    """
    La funcion pide al menos 3 argumentos:
    
    to: lista de destinatarios ['email@example.com']
    subject: asunto del email
    template: nombre del template (sin extensión)
    **kwargs: variables para el template
    """

    # Configuracion del mail
    msg = Message(subject, sender=current_app.config["FLASKY_MAIL_SENDER"], recipients=to)
    
    try:
        # Creación del cuerpo del mensaje
        msg.body = render_template(template + ".txt", **kwargs)
        msg.html = render_template(template + ".html", **kwargs)
        
        # Envío de mail
        result = mailsender.send(msg)
        
        return True
        
    except SMTPException as e:
        print(str(e))
        return "Mail deliver failed"