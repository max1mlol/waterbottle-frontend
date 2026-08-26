// src/api.js — the only file that talks to the backend
import { BACKEND_BASEPATH } from './constants';

// Small helper: fetch + error check + JSON parse.
// Returns null for 204 (no body) instead of crashing on .json().
async function request(path, options = {}) {
    const response = await fetch(BACKEND_BASEPATH + path, options);
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    if (response.status === 204) {
        return null;
    }
    return response.json();
}

const jsonHeaders = { 'Content-Type': 'application/json' };

// ---------- Vendors ----------
export function getVendors(query) {
    const qs = new URLSearchParams(query).toString();
    return request(`/vendors?${qs}`);
}

export function createVendor(data) {
    return request('/vendors', {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify(data),
    });
}

export function updateVendor(id, data) {
    return request(`/vendors/${id}`, {
        method: 'PUT',
        headers: jsonHeaders,
        body: JSON.stringify(data),
    });
}

export function deleteVendor(id) {
    return request(`/vendors/${id}`, { method: 'DELETE' });
}

export function getVendorBottles(id) {
    return request(`/vendors/${id}/bottles`);
}

// ---------- Water Bottles ----------
export function getBottles(query) {
    const qs = new URLSearchParams(query).toString();
    return request(`/water-bottles?${qs}`);
}

export function createBottle(data) {
    return request('/water-bottles', {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify(data),
    });
}

export function updateBottle(id, data) {
    return request(`/water-bottles/${id}`, {
        method: 'PUT',
        headers: jsonHeaders,
        body: JSON.stringify(data),
    });
}

export function deleteBottle(id) {
    return request(`/water-bottles/${id}`, { method: 'DELETE' });
}

// ---------- Boxes ----------
export function getBoxes(query) {
    const qs = new URLSearchParams(query).toString();
    return request(`/boxes?${qs}`);
}

export function createBox(data) {
    return request('/boxes', {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify(data),
    });
}

export function updateBox(id, data) {
    return request(`/boxes/${id}`, {
        method: 'PUT',
        headers: jsonHeaders,
        body: JSON.stringify(data),
    });
}

export function deleteBox(id) {
    return request(`/boxes/${id}`, { method: 'DELETE' });
}