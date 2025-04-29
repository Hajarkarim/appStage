from flask import Flask, request, jsonify
import json
import os
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash  # Ajout pour vérifier et générer des hash

app = Flask(__name__)
CORS(app)

USER_FILE = "users.json"  # Fichier des utilisateurs

# -------- FONCTIONS UTILITAIRES --------
def load_data(file_path):
    """Charge les données depuis un fichier JSON"""
    if os.path.exists(file_path):
        with open(file_path, "r") as f:
            return json.load(f)
    return []  # Si le fichier n'existe pas, retourner une liste vide

def save_data(file_path, data):
    """Sauvegarde les données dans un fichier JSON"""
    with open(file_path, "w") as f:
        json.dump(data, f, indent=4)

# -------- ROUTES UTILISATEUR --------
@app.route("/user/login", methods=["POST"])
def user_login():
    """Route pour connecter un utilisateur"""
    data = request.get_json()
    users = load_data("userLogin.json")

    for user in users:
        if user["email"] == data["email"]:
            if check_password_hash(user["password"], data["password"]):
                return jsonify({"success": True})
            else:
                return jsonify({"success": False, "message": "Mot de passe incorrect"}), 401

    return jsonify({"success": False, "message": "Identifiants incorrects"}), 401

@app.route("/user/add", methods=["POST"])
def register_user_login():
    """Ajoute un utilisateur dans userLogin.json (utilisateurs avec email et mot de passe)"""
    data = request.get_json()
    users = load_data("userLogin.json")

    # Optionnel : empêcher les doublons d'email
    if any(u["email"] == data["email"] for u in users):
        return jsonify({"success": False, "message": "Email déjà utilisé"}), 400

    new_id = max([u["id"] for u in users], default=0) + 1
    hashed_password = generate_password_hash(data["password"])  # Hachage du mot de passe

    user = {
        "id": new_id,
        "nom": data.get("nom", ""),
        "prenom": data.get("prenom", ""),
        "email": data.get("email", ""),
        "password": hashed_password  # Utilisation du mot de passe haché
    }

    users.append(user)
    save_data("userLogin.json", users)
    return jsonify({"success": True, "message": "Utilisateur ajouté avec succès", "user": user})


@app.route("/users", methods=["GET"])
def get_users():
    """Route pour récupérer tous les utilisateurs"""
    users = load_data(USER_FILE)  # Lire depuis users.json
    return jsonify(users)

@app.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    """Route pour récupérer un utilisateur par son ID"""
    users = load_data(USER_FILE)
    user = next((u for u in users if u["id"] == user_id), None)
    
    if user:
        return jsonify(user)
    else:
        return jsonify({"message": "Utilisateur non trouvé"}), 404

# -------- NOUVELLE ROUTE POUR /add_user --------
@app.route("/add_user", methods=["POST"])
def add_user_simple():
    """Ajoute un utilisateur avec nom, prénom et affectation uniquement"""
    data = request.get_json()
    users = load_data(USER_FILE)
    new_id = max([u["id"] for u in users], default=0) + 1

    user = {
        "id": new_id,
        "nom": data.get("nom", ""),
        "prenom": data.get("prenom", ""),
        "affectation": data.get("affectation", ""),
        "note": "",
        "description": ""
    }

    users.append(user)
    save_data(USER_FILE, users)
    return jsonify({"message": "Utilisateur ajouté avec succès (simple)", "user": user})

# -------- NOUVELLE ROUTE POUR AJOUTER UNE NOTE --------
@app.route("/add_rating", methods=["POST"])
def add_rating():
    """Ajoute une note et une description à un utilisateur existant"""
    data = request.get_json()
    users = load_data(USER_FILE)
    user_id = data.get("id")

    for user in users:
        if user["id"] == user_id:
            user["note"] = data.get("rating", "")
            user["description"] = data.get("description", "")
            save_data(USER_FILE, users)
            return jsonify({"message": "Évaluation ajoutée avec succès", "users": users})

    return jsonify({"message": "Utilisateur non trouvé"}), 404

@app.route("/admin/login", methods=["POST"])
def admin_login():
    """Connexion pour l'admin"""
    data = request.get_json()
    admins = load_data("admin.json")

    for admin in admins:
        if admin["email"] == data["email"]:
            if check_password_hash(admin["password"], data["password"]):
                return jsonify({"success": True, "admin": admin})
            else:
                return jsonify({"success": False, "message": "Mot de passe incorrect"}), 401

    return jsonify({"success": False, "message": "Identifiants incorrects"}), 401


if __name__ == "__main__":
    app.run(debug=True)

