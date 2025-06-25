from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from db import db
from models import Persona

persona_bp = Blueprint('persona_bp', __name__)

@persona_bp.route('', methods=['GET'])
@jwt_required()
def get_personas():
    personas = Persona.query.filter_by(estado=True).all()
    return jsonify([p.to_dict() for p in personas])

@persona_bp.route('', methods=['POST'])
@jwt_required()
def create_persona():
    data = request.get_json()
    try:
        persona = Persona(
            nombre_completo=data['nombre_completo'],
            identificacion=data['identificacion'],
            edad=data['edad'],
            genero=data['genero'],
            estado=data.get('estado', True),
            maneja=data.get('maneja', False),
            usa_lentes=data.get('usa_lentes', False),
            diabetico=data.get('diabetico', False),
            otra_enfermedad=data.get('otra_enfermedad')
        )
        db.session.add(persona)
        db.session.commit()
        return jsonify({ "message": "Persona creada", "id": persona.id }), 201
    except Exception as e:
        return jsonify({ "error": str(e) }), 400

@persona_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_persona(id):
    persona = Persona.query.get(id)
    if not persona:
        return jsonify({ "error": "Persona no encontrada" }), 404

    data = request.get_json()
    persona.nombre_completo = data.get('nombre_completo', persona.nombre_completo)
    persona.identificacion = data.get('identificacion', persona.identificacion)
    persona.edad = data.get('edad', persona.edad)
    persona.genero = data.get('genero', persona.genero)
    persona.estado = data.get('estado', persona.estado)
    persona.maneja = data.get('maneja', persona.maneja)
    persona.usa_lentes = data.get('usa_lentes', persona.usa_lentes)
    persona.diabetico = data.get('diabetico', persona.diabetico)
    persona.otra_enfermedad = data.get('otra_enfermedad', persona.otra_enfermedad)

    db.session.commit()
    return jsonify({ "message": "Persona actualizada" }), 200

@persona_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_persona(id):
    persona = Persona.query.get(id)
    if not persona:
        return jsonify({ "error": "Persona no encontrada" }), 404
    persona.estado = False
    db.session.commit()
    return jsonify({ "message": "Persona dada de baja" }), 200
