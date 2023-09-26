import React from 'react';
import toast from 'react-hot-toast';
import Copy from './Copy';

const PasswordHistoryItem = ({ password }) => {
    const handleCopyToClipboard = () => {
        if (!password) {
            return;
        }

        navigator.clipboard.writeText(password)
            .then(() => {
                toast.success('Password copied to clipboard', {
                    position: 'top-right',
                    duration: 2000,
                });
            })
            .catch((error) => {
                console.error('Copy to clipboard failed:', error);
                toast.error('Copy to clipboard failed');
            });
    };

    return (
        <div className="flex items-center justify-between p-2 px-4 rounded-sm bg-primary/10">
            <span>{password}</span>
            <button className='px-2 py-1 rounded-sm ' onClick={handleCopyToClipboard}>
                <Copy />
            </button>
        </div>
    );
}

export default PasswordHistoryItem;
