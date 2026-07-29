/**
 * Mock Database Implementation using localStorage
 * Implements Phase 0: System Setup
 */

const DB = {
    // Keys
    KEYS: {
        USERS: 'sms_users',
        EVENTS: 'sms_events',
        REGISTRATIONS: 'sms_registrations',
        CURRENT_USER: 'sms_current_user'
    },

    // Initialize Database with Mock Data
    init: function () {
        if (!localStorage.getItem(this.KEYS.USERS)) {
            const users = [
                { id: 'u1', name: 'Alex Johnson', email: 'alex@host.com', role: 'user', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnAzeKiFy3rQWbzmf82TN5sCGmtVKbVS6jLBhQjgdFUZgV0Wvy3847m2MoNs7K44qZztScZ4_HAZcEvCKoRCo76GvDXJzAk9eYDADi3n_-SzAjPqdS3WJmc3X_fan4CU-t2TArMKXXefw0bmP2_u15gDhK2kYrFt9fRf3nryoO_Eb7TiLIbNsafDyQWFhQUPHvKdHECLlhtWncMiDwVQEjuhOLRJogPc1sqhZmCU2TmDkE7F546gHQK04O0_J50JX0OHOXenoyNnU' },
                { id: 'o1', name: 'Sarah Jenkins', email: 'sarah@org.com', role: 'organizer', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiHIXaWpBURrkGOT5SQz_Ii6rHPdb0kz9yRbRueqMNTvyuBM3JbnkY5uAMz25vAD384Y6hbvyqs6Uiroe8e_YTgDleE-7dLVI4MdGNxQGPkZwjpJ8qTLokeJADh5UtwfFdlK29-GfBPD51QJmr9WKqi1N13sNz-B97vZuRRXU_sTWuM9nIWwSBMderTg_tzHoTdEZf6DfC--7FELuzuL6EECkXTUDydGLEHGFY89m_JvMaf3VMv5EccBIM57HlDL1BVPRpmHF_A5E' }
            ];
            localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
        }

        let existingEvents = localStorage.getItem(this.KEYS.EVENTS);
        if (!existingEvents) {
            const events = [
                {
                    id: 'e1',
                    title: 'Zodiac Desi Night',
                    date: '2024-11-02',
                    time: '08:00 PM',
                    location: 'Downtown Arena',
                    price: 250,
                    image: '/assets/image.png',
                    category: 'Music',
                    capacity: 500,
                    tickets_sold: 120
                },
                {
                    id: 'e2',
                    title: 'Future of AI Summit',
                    date: '2024-11-05',
                    time: '09:00 AM',
                    location: 'Tech Hub Center',
                    price: 150,
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmrZi8jLY6dSt7tiESpepTnTdulsIa034S7N0xcd2frdGx0JDLCUzXGK7nco2HgpieBaiIkG4OkjWbDAp6XxjJklTPL5xgFvWS9LqMMK609lEQcFNXW2weqToKbK8waAxwa-rEHIDqEUNa9mmOfTkOuh41xp1lB9f5C70Wgdtt-FLMTjJmN2VuqKdJCVag-xD7hqeh91ZseDIMC4fouAgkPXjU9ERzm2YKBue-Bi7TOU1WM6XXtFPiFk1UwirSFZXNaha9TACqWk0',
                    category: 'Tech',
                    capacity: 200,
                    tickets_sold: 150
                },
                {
                    id: 'e3',
                    title: 'Modern Art Gallery Opening',
                    date: '2024-11-12',
                    time: '06:00 PM',
                    location: 'The Grand Hall',
                    price: 0,
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUGLRmNClrHk0Ux1vqy8LAiqyfpZytH-YZIuJoffCAInT6y3HjPVNycy_IVJyi-ROuNTRyBtx49l_4ygtN58JSiKA35osJXBrz93l24qtUdBu6Eh8MSHP_C0I4yWbjd_KxsR_-xXbI5-YcFqul90S4J95KGYTfnImoYBnyz0uwipaOSwKrMxU1BNuDFGNhSZ_QSAFHN_W453TNJkGCZ325MvGmpG1tdaaoWzACu19pIWGB4RV0OFnSvPzwSW2Ud55Mg5Gqj1GO3ZI',
                    category: 'Arts',
                    capacity: 100,
                    tickets_sold: 45
                }
            ];
            localStorage.setItem(this.KEYS.EVENTS, JSON.stringify(events));
        } else {
            // Hotfix update for e1
            let parsedEvents = JSON.parse(existingEvents);
            let e1 = parsedEvents.find(e => e.id === 'e1');
            if (e1 && (e1.title === 'Neon Nights Festival' || e1.title === 'Zodiac Desi Night')) {
                e1.title = 'Zodiac Desi Night';
                e1.price = 250;
                e1.image = '/assets/image.png';
                localStorage.setItem(this.KEYS.EVENTS, JSON.stringify(parsedEvents));
            }
        }

        if (!localStorage.getItem(this.KEYS.REGISTRATIONS)) {
            // Mock a registration for the current user
            const regs = [
                {
                    id: 'sms-8299-xj',
                    event_id: 'e3',
                    user_id: 'u1',
                    status: 'pending', // pending, checked-in
                    timestamp: new Date().toISOString()
                }
            ];
            localStorage.setItem(this.KEYS.REGISTRATIONS, JSON.stringify(regs));
        }
    },

    // Auth Methods
    signup: function (userData) {
        const users = JSON.parse(localStorage.getItem(this.KEYS.USERS)) || [];
        const existingUser = users.find(u => u.email === userData.email && u.role === userData.role);
        if (existingUser) return null; // Already exists

        const newUser = {
            id: userData.role.charAt(0) + Date.now(),
            ...userData,
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnAzeKiFy3rQWbzmf82TN5sCGmtVKbVS6jLBhQjgdFUZgV0Wvy3847m2MoNs7K44qZztScZ4_HAZcEvCKoRCo76GvDXJzAk9eYDADi3n_-SzAjPqdS3WJmc3X_fan4CU-t2TArMKXXefw0bmP2_u15gDhK2kYrFt9fRf3nryoO_Eb7TiLIbNsafDyQWFhQUPHvKdHECLlhtWncMiDwVQEjuhOLRJogPc1sqhZmCU2TmDkE7F546gHQK04O0_J50JX0OHOXenoyNnU' // Default avatar
        };
        users.push(newUser);
        localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
        localStorage.setItem(this.KEYS.CURRENT_USER, JSON.stringify(newUser));
        return newUser;
    },

    login: function (email, role) {
        const users = JSON.parse(localStorage.getItem(this.KEYS.USERS));
        const user = users.find(u => u.email === email && u.role === role);
        if (user) {
            localStorage.setItem(this.KEYS.CURRENT_USER, JSON.stringify(user));
            return user;
        }
        return null;
    },

    getCurrentUser: function () {
        return JSON.parse(localStorage.getItem(this.KEYS.CURRENT_USER));
    },

    logout: function () {
        localStorage.removeItem(this.KEYS.CURRENT_USER);
        window.location.href = '/auth.html';
    }
};

// Auto-initialize on load
DB.init();
