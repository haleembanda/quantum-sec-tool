import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const api = {
    blue: {
        getStats: () => axios.get(`${API_URL}/blue/stats`),
        getLogs: () => axios.get(`${API_URL}/blue/logs`),
        remediate: (attackType) => axios.post(`${API_URL}/blue/remediate`, { attack_type: attackType }),
    },
    red: {
        scan: (targetIp, ports) => axios.post(`${API_URL}/red/scan`, { target_ip: targetIp, ports }),
        simulate: (attackType) => axios.post(`${API_URL}/red/simulate`, { attack_type: attackType }),
    },
    quantum: {
        runGrover: (qubits) => axios.get(`${API_URL}/quantum/grover`, { params: { qubits } }),
        getEntropy: () => axios.get(`${API_URL}/quantum/entropy`),
    }
};
