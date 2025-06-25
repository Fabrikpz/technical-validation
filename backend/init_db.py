from app import create_app, db
from models import Account

app = create_app()

with app.app_context():
    db.create_all()

    if not Account.query.filter_by(username="pepito").first():
        empleado = Account(username="pepito")
        empleado.set_password("123456")
        db.session.add(empleado)
        db.session.commit()
        print("Empleado creado exitosamente.")
    else:
        print("Ya existe el empleado.")
