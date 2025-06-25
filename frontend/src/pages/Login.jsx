import LoginForm from '../components/LoginForm';
export default function Login() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <h2 className="text-center">Iniciar sesión</h2>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}