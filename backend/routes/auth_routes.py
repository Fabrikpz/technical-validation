# routes/auth_routes.py
from flask import Blueprint, request, jsonify
from models import Account
from db import db
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    account = Account.query.filter_by(username=username).first()
    if account and account.check_password(password):
        token = create_access_token(identity=str(account.id))
        return jsonify({ "access_token": token }), 200
    return jsonify({ "error": "Credenciales inválidas" }), 401
