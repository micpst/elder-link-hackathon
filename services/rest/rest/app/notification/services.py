from twilio.rest import Client

from smtplib import SMTP_SSL

from rest.settings import (
    DJANGO_EMAIL_PASSWORD,
    DJANGO_EMAIL_USER,
    DJANGO_SMS_PASSWORD,
    DJANGO_SMS_PHONE,
    DJANGO_SMS_USER,
)


class NotificationService:
    @classmethod
    def send_mail(cls, to_email: str, name: str) -> None:
        with SMTP_SSL("smtp.mail.yahoo.com", 465) as client:
            client.login(DJANGO_EMAIL_USER, DJANGO_EMAIL_PASSWORD)
            client.sendmail(
                from_addr=DJANGO_EMAIL_USER,
                to_addrs=to_email,
                msg=cls.generate_email_message(name),
            )

    @classmethod
    def send_sms(cls, to_phone: str, name: str) -> None:
        client = Client(DJANGO_SMS_USER, DJANGO_SMS_PASSWORD)
        client.messages.create(
            from_=DJANGO_SMS_PHONE,
            to=to_phone,
            body=cls.generate_sms_message(name),
        )

    @staticmethod
    def generate_sms_message(name: str) -> str:
        return (
            f"Czesc {name}! "
            "Chcielismy Cie poinformowac, "
            "ze Twoj profil na ElderLink zostal wybrany przez jednego z naszych seniorow. "
            "Gratulacje! Spodziewaj sie telefonu od seniora wkrotce! "
            "Pozdrawiamy, "
            "Zespol ElderLink."
        )

    @staticmethod
    def generate_email_message(name: str) -> str:
        return (
            f"Subject: Twoj profil zostal wybrany na ElderLink\n\n"
            f"Czesc {name}!\n"
            "Chcielismy Cie poinformowac, "
            "ze Twoj profil na ElderLink zostal wybrany przez jednego z naszych seniorow. "
            "Gratulacje! Spodziewaj sie telefonu od seniora wkrotce!\n\n"
            "Pozdrawiamy,\n"
            "Zespol ElderLink"
        )
