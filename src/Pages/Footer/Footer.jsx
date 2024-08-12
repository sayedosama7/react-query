import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div>
            <footer className="bg-body-tertiary text-center text-lg-start">
                <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    © {currentYear} Copyright:
                    <p className="text-body">sayed osama</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
