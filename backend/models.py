from db import db
from werkzeug.security import generate_password_hash, check_password_hash

class Account(db.Model):
    __tablename__ = 'accounts'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Persona(db.Model):
    __tablename__ = 'personas'

    id = db.Column(db.Integer, primary_key=True)
    nombre_completo = db.Column(db.String(100), nullable=False)
    identificacion = db.Column(db.String(50), nullable=False, unique=True)
    edad = db.Column(db.Integer, nullable=False)
    genero = db.Column(db.String(20), nullable=False)
    estado = db.Column(db.Boolean, default=True, nullable=False)
    maneja = db.Column(db.Boolean, default=False)
    usa_lentes = db.Column(db.Boolean, default=False)
    diabetico = db.Column(db.Boolean, default=False)
    otra_enfermedad = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "nombre_completo": self.nombre_completo,
            "identificacion": self.identificacion,
            "edad": self.edad,
            "genero": self.genero,
            "estado": self.estado,
            "maneja": self.maneja,
            "usa_lentes": self.usa_lentes,
            "diabetico": self.diabetico,
            "otra_enfermedad": self.otra_enfermedad
        }