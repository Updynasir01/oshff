import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Adjust if your API URL is different

const MenuManagement = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'appetizers', // Default to first category
        image: null,
        ingredients: '', // Store as comma-separated string for input
        dietaryInfo: {
            vegetarian: false,
            vegan: false,
            glutenFree: false
        },
        isAvailable: true
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const categories = ['appetizers', 'main-courses', 'desserts', 'drinks', 'specials'];

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const getAuthToken = () => {
        // Replace with your actual auth token retrieval logic
        return localStorage.getItem('authToken');
    };

    const fetchMenuItems = async () => {
        setLoading(true);
        try {
            // Fetch all items, not just available ones, for admin view
            const response = await axios.get(`${API_URL}/api/menu`);
            setMenuItems(response.data);
            setError('');
        } catch (err) {
            console.error('Error fetching menu items:', err);
            setError('Failed to load menu items. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'vegetarian' || name === 'vegan' || name === 'glutenFree') {
            setFormData(prev => ({
                ...prev,
                dietaryInfo: { ...prev.dietaryInfo, [name]: checked }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleImageChange = (e) => {
        setFormData(prev => ({
            ...prev,
            image: e.target.files[0]
        }));
    };

    const resetFormFields = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            category: 'appetizers',
            image: null,
            ingredients: '',
            dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false },
            isAvailable: true
        });
        setEditingItem(null);
        setError('');
        // Reset file input visually
        const fileInput = document.getElementById('image-upload');
        if (fileInput) fileInput.value = '';
    };

    const toggleForm = () => {
        const currentlyVisible = showForm;
        setShowForm(!currentlyVisible);
        // If we are opening the form (i.e., it was previously hidden), reset fields and ensure not in edit mode
        if (!currentlyVisible) {
            resetFormFields();
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            image: null, // Don't pre-fill file input, show current image below
            ingredients: item.ingredients.join(', '), // Join array for input
            dietaryInfo: item.dietaryInfo || { vegetarian: false, vegan: false, glutenFree: false }, // Ensure object exists
            isAvailable: item.isAvailable
        });
        setShowForm(true); // Ensure form is visible when editing
        window.scrollTo(0, 0); // Scroll to top to show form
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this menu item?')) {
            setLoading(true);
            try {
                const token = getAuthToken();
                await axios.delete(`${API_URL}/api/menu/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchMenuItems(); // Refresh list
                resetFormFields();
            } catch (err) {
                console.error('Error deleting menu item:', err);
                setError('Failed to delete item. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Validate ingredients format
            const ingredientsArray = formData.ingredients
                ? formData.ingredients.split(',').map(s => s.trim()).filter(Boolean)
                : [];

            const submissionData = new FormData();
            submissionData.append('name', formData.name);
            submissionData.append('description', formData.description);
            submissionData.append('price', formData.price);
            submissionData.append('category', formData.category);
            if (formData.image) {
                submissionData.append('image', formData.image);
            }
            
            // Convert arrays and objects to JSON strings
            submissionData.append('ingredients', JSON.stringify(ingredientsArray));
            submissionData.append('dietaryInfo', JSON.stringify(formData.dietaryInfo));
            submissionData.append('isAvailable', formData.isAvailable);

            const token = getAuthToken();
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            };

            if (editingItem) {
                await axios.put(`${API_URL}/api/menu/${editingItem._id}`, submissionData, config);
            } else {
                await axios.post(`${API_URL}/api/menu`, submissionData, config);
            }
            fetchMenuItems();
            resetFormFields();
            setShowForm(false);
        } catch (err) {
            console.error('Error saving menu item:', err.response ? err.response.data : err);
            setError(`Failed to save item: ${err.response?.data?.message || 'Please check inputs and try again.'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Menu Management</h2>
                <button
                    onClick={toggleForm}
                    className="flex items-center bg-primary text-white px-4 py-2 rounded-md shadow hover:bg-primary-dark transition duration-200"
                >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    {showForm ? 'Cancel' : 'Add New Item'}
                </button>
            </div>

            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

            {/* Add/Edit Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                        {/* Price */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                            <input type="number" name="price" id="price" value={formData.price} onChange={handleInputChange} required step="0.01" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                        {/* Description */}
                        <div className="md:col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea name="description" id="description" value={formData.description} onChange={handleInputChange} required rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                        {/* Category */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select name="category" id="category" value={formData.category} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white">
                                {categories.map(cat => <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}</option>)}
                            </select>
                        </div>
                        {/* Image Upload */}
                        <div>
                            <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                            <input type="file" name="image" id="image-upload" onChange={handleImageChange} accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-primary/20" />
                            {editingItem && editingItem.image && !formData.image && (
                                <div className="mt-2">
                                    <span className="text-sm text-gray-500">Current:</span>
                                    <img src={`${API_URL}/${editingItem.image}`} alt="Current item" className="h-16 w-auto mt-1 rounded" />
                                </div>
                            )}
                        </div>
                        {/* Ingredients */}
                        <div className="md:col-span-2">
                            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">Ingredients (comma-separated)</label>
                            <input type="text" name="ingredients" id="ingredients" value={formData.ingredients} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                        {/* Dietary Info */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Dietary Information</label>
                            <div className="flex items-center space-x-4">
                                {['vegetarian', 'vegan', 'glutenFree'].map(diet => (
                                    <div key={diet} className="flex items-center">
                                        <input type="checkbox" name={diet} id={diet} checked={formData.dietaryInfo[diet]} onChange={handleInputChange} className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                                        <label htmlFor={diet} className="ml-2 block text-sm text-gray-900">{diet.charAt(0).toUpperCase() + diet.slice(1).replace('Free', ' Free')}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Availability */}
                        <div className="flex items-center">
                            <input type="checkbox" name="isAvailable" id="isAvailable" checked={formData.isAvailable} onChange={handleInputChange} className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                            <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-900">Is Available?</label>
                        </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                           type="button"
                           onClick={toggleForm}
                           className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50">
                            {loading ? 'Saving...' : (editingItem ? 'Update Item' : 'Add Item')}
                        </button>
                    </div>
                </form>
            )}

            {/* Menu Items List/Table */}
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading && !menuItems.length ? (
                            <tr><td colSpan="6" className="text-center py-4">Loading menu...</td></tr>
                        ) : menuItems.length === 0 ? (
                            <tr><td colSpan="6" className="text-center py-4">No menu items found.</td></tr>
                        ) : (
                            menuItems.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.image ? (
                                            <img src={`${API_URL}/${item.image}`} alt={item.name} className="h-10 w-10 rounded-md object-cover" />
                                        ) : (
                                            <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center text-gray-400">?</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.price.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {item.isAvailable ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button onClick={() => handleEdit(item)} className="text-primary hover:text-primary-dark" title="Edit">
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-800" title="Delete">
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MenuManagement; 