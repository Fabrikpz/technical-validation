import PersonList from '../components/PersonList';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Personas Registradas</h2>
                <div>
                    <button className="btn btn-success me-2" onClick={() => navigate('/persona/nueva')}>Nueva Persona</button>
                    <button className="btn btn-outline-secondary" onClick={logout}>Cerrar sesión</button>
                </div>
            </div>
            <PersonList />
        </div>
    );
}