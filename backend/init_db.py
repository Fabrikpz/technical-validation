from app import create_app, db
from models import Account

app = create_app()

with app.app_context():
    db.create_all()

    if not Account.query.filter_by(username="admin").first():
        empleado = Account(username="admin")
        empleado.set_password("admin")
        db.session.add(empleado)
        db.session.commit()
        print("Empleado creado exitosamente.")
    else:
        print("Ya existe el empleado.")
