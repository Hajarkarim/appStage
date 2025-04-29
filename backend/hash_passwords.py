import json
from werkzeug.security import generate_password_hash

def hash_passwords(file_path):
    with open(file_path, "r") as f:
        users = json.load(f)

    for user in users:
        # Vérifie si le mot de passe n’est pas déjà hashé (très simplifié)
        if not user["password"].startswith("pbkdf2:"):
            user["password"] = generate_password_hash(user["password"])

    with open(file_path, "w") as f:
        json.dump(users, f, indent=4)

    print(f"✔ Tous les mots de passe dans {file_path} sont maintenant hashés.")

# Hasher les deux fichiers
hash_passwords("admin.json")
hash_passwords("userLogin.json")
