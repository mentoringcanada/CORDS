import model


def get_acceptable_origins_for_cors():
    return model.get_accepted_origins()


def update_ip(client_host, session_token):
    if session_token:
        model.update_ip(client_host, session_token)
