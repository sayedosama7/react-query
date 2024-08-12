

import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import './NavBar.css'
export default function BasicDemo() {
    const navigate = useNavigate();

    const items = [
        {
            template: () => (
                <span className='text-danger'>react query</span>
            )
        },
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => navigate('/')

        },
        {
            label: 'about',
            icon: 'pi pi-star',
            command: () => navigate('/about')
        },
        {
            label: 'Products',
            icon: 'pi pi-envelope',
            command: () => navigate('/products')

        }
    ];

    return (
        <div className="card">
            <Menubar className='pt-3 pb-0 navbar' model={items} />
        </div>
    )
}

