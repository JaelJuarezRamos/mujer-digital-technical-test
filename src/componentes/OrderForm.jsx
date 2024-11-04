// src/components/OrderForm.jsx
import React, { useState } from "react";
import { db, collection, addDoc, Timestamp } from "../util/firebase";

const OrderForm = () => {
    const [customerName, setCustomerName] = useState("");
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [modality, setModality] = useState("");
    const [error, setError] = useState("");

    const menuItems = [
        { label: "Hamburguesa simple", price: 50 },
        { label: "Hot dog", price: 40 },
        { label: "Hamburguesa doble", price: 70 },
        { label: "Papas fritas frescas", price: 30 },
        { label: "Soda", price: 20 },
    ];

    const handleCheckboxChange = (item) => {
        const isChecked = items.includes(item.label);
        if (isChecked) {
            setItems(items.filter((i) => i !== item.label));
            setTotal(total - item.price);
        } else {
            setItems([...items, item.label]);
            setTotal(total + item.price);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validaciones
        if (!customerName) {
            setError("Por favor ingresa el nombre del cliente.");
            return;
        }
        if (items.length === 0) {
            setError("Por favor selecciona al menos un elemento del menú.");
            return;
        }
        if (!modality) {
            setError("Por favor selecciona el método de entrega.");
            return;
        }
        
        setError("");

        // Crea el documento en Firestore
        try {
            const docRef = await addDoc(collection(db, "orders"), {
                customerName,
                items,
                total,
                modality,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
            });
            console.log("Documento agregado con ID: ", docRef.id);

            // Reinicia el formulario
            setCustomerName("");
            setItems([]);
            setTotal(0);
            setModality("");
        } catch (error) {
            console.error("Error al agregar el documento: ", error);
            setError("Hubo un error al enviar el pedido. Inténtalo nuevamente.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Crear Pedido</h2>

            <div>
                <label>Nombre del cliente:</label>
                <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                />
            </div>

            <div>
                <label>Selecciona los elementos del menú:</label>
                {menuItems.map((item) => (
                    <div key={item.label}>
                        <input
                            type="checkbox"
                            checked={items.includes(item.label)}
                            onChange={() => handleCheckboxChange(item)}
                        />
                        {item.label} - ${item.price}
                    </div>
                ))}
            </div>

            <div>
                <label>Importe total:</label>
                <input type="number" value={total} readOnly />
            </div>

            <div>
                <label>Recogida o Entrega:</label>
                <input
                    type="radio"
                    name="modality"
                    value="pickup"
                    checked={modality === "pickup"}
                    onChange={(e) => setModality(e.target.value)}
                />
                Recogida
                <input
                    type="radio"
                    name="modality"
                    value="delivery"
                    checked={modality === "delivery"}
                    onChange={(e) => setModality(e.target.value)}
                />
                Entrega
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit">Enviar</button>
        </form>
    );
};

export default OrderForm;
