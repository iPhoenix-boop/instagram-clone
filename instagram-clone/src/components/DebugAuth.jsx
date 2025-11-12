import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

export default function DebugAuth() {
    const [status, setStatus] = useState('Testing...');
    const [session, setSession] = useState(null);

    useEffect(() => {
        testAuth();
    }, []);

    const testAuth = async () => {
        try {
            // Test 1: Check if we can get session
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

            if (sessionError) {
                setStatus(`❌ Session Error: ${sessionError.message}`);
                return;
            }

            setSession(sessionData.session);

            // Test 2: Check if we can query profiles
            const { data: profilesData, error: profilesError } = await supabase
                .from('profiles')
                .select('*')
                .limit(1);

            if (profilesError) {
                setStatus(`❌ Profiles Error: ${profilesError.message}`);
                return;
            }

            setStatus('✅ Auth setup is working! You can now sign up.');

        } catch (error) {
            setStatus(`❌ Unexpected error: ${error.message}`);
        }
    };

    const testSignup = async () => {
        const testEmail = `test${Date.now()}@test.com`;
        const testPassword = 'password123';

        setStatus('Testing signup...');

        const { data, error } = await supabase.auth.signUp({
            email: testEmail,
            password: testPassword,
        });

        if (error) {
            setStatus(`❌ Signup failed: ${error.message}`);
        } else {
            setStatus(`✅ Signup successful! Check your email: ${testEmail}`);
        }
    };

    return (
        <div style={{
            padding: '20px',
            margin: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
        }}>
            <h3>Auth Debugger</h3>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Session:</strong> {session ? 'Active' : 'No session'}</p>
            <button
                onClick={testAuth}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginRight: '10px'
                }}
            >
                Test Connection
            </button>
            <button
                onClick={testSignup}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Test Signup
            </button>
        </div>
    );
}