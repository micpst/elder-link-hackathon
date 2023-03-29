#!/bin/bash

python manage.py flush --no-input
python manage.py migrate
python manage.py loaddata users
python manage.py runserver 0.0.0.0:8000
