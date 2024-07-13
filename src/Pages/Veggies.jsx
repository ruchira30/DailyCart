import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../fv.css';
import logo from '../Images/logo.png';
import '../Mainpage.css';
import cart from '../Images/shopping_cart_PNG38.png';
import tomatoes from '../Images/tomatoes.jpeg';
import potatoes from '../Images/potatoes.jpeg';
import onions from '../Images/onions.jpg';
import brinjal from '../Images/brinjal.jpeg';
import okra from '../Images/okra.jpeg';
import karela from '../Images/karela.jpeg';
import cauliflower from '../Images/cauliflower.jpeg';
import cabbage from '../Images/cabbage.jpeg';
import mushrooms from '../Images/mushrooms.jpg';
import brocolli from '../Images/broccoli.jpeg';
import zucchinni from '../Images/zucchinni.jpeg';
import redcabbage from '../Images/red cabbage.jpeg';
import yellowbell from '../Images/yellow bell.jpeg';
import redbell from '../Images/red bell.jpeg';
import { useNavigate } from 'react-router-dom';

const FV = () => {
    const [data, setData] = useState([]);
    const [selectedWeights, setSelectedWeights] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [showCounter, setShowCounter] = useState({});
    const [counts, setCounts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://192.168.183.66:5000/fruitsndvegetables');
            setData(response.data);
            const initialWeights = response.data.map(item => item.weightOptions[0]?.weight || '');
            const initialPrices = response.data.map(item => item.weightOptions[0]?.price || null);
            setSelectedWeights(initialWeights);
            setSelectedPrices(initialPrices);
            const initialShowCounterState = {};
            response.data.forEach((item, index) => {
                initialShowCounterState[index] = false;
            });
            setShowCounter(initialShowCounterState);
            setCounts(Array(response.data.length).fill(0));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getImageForIndex = (index) => {
        switch (index) {
            case 0: return tomatoes;
            case 1: return potatoes;
            case 2: return onions;
            case 3: return brinjal;
            case 4: return okra;
            case 5: return karela;
            case 6: return cauliflower;
            case 7: return cabbage;
            case 8: return mushrooms;
            case 9: return brocolli;
            case 10: return zucchinni;
            case 11: return redcabbage;
            case 12: return yellowbell;
            case 13: return redbell;
            default: return null;
        }
    };

    const handleSelectChange = (event, index) => {
        const selectedWeight = event.target.value;
        const updatedWeights = [...selectedWeights];
        updatedWeights[index] = selectedWeight;
        setSelectedWeights(updatedWeights);

        const selectedItem = data[index];
        const selectedOption = selectedItem.weightOptions.find(option => option.weight === selectedWeight);
        const updatedPrices = [...selectedPrices];
        updatedPrices[index] = selectedOption ? selectedOption.price : null;
        setSelectedPrices(updatedPrices);
    };

    const incrementCount = (index) => {
        setCounts(prevCounts => {
            const newCounts = [...prevCounts];
            newCounts[index] += 1;
            return newCounts;
        });
    };

    const decrementCount = (index) => {
        setCounts(prevCounts => {
            const newCounts = [...prevCounts];
            if (newCounts[index] > 0) {
                newCounts[index] -= 1;
            }
            return newCounts;
        });
    };

    const CounterButton = ({ index, count }) => {
        return (
            <div className="counter-button">
                <button className="counter-btn" onClick={() => decrementCount(index)}>-</button>
                <span className="count-display">{count}</span>
                <button className="counter-btn" onClick={() => incrementCount(index)}>+</button>
            </div>
        );
    };

    const handleAddClick = (index) => {
        setShowCounter(prevState => ({
            ...prevState,
            [index]: true,
        }));
    };

    const goToCart = () => {
        const filteredData = data.filter((_, index) => counts[index] > 0);
        const filteredCounts = counts.filter(count => count > 0);
        const filteredWeights = selectedWeights.filter((_, index) => counts[index] > 0);
        const filteredPrices = selectedPrices.filter((_, index) => counts[index] > 0);
        const filteredImages = data.map((_, index) => getImageForIndex(index)).filter((_, index) => counts[index] > 0);

        navigate('/cart', {
            state: {
                data: filteredData,
                counts: filteredCounts,
                selectedWeights: filteredWeights,
                selectedPrices: filteredPrices,
                images: filteredImages,
            },
        });
    };

    const totalItemsInCart = counts.reduce((total, count) => total + count, 0);

    return (
        <div>
            <div className='Home-navbar'>
                <img src={logo} alt='logo' className='Home-logo' />
                <div className='Home-profile-container'>
                    <img src={cart} alt='cart' className='Home-profile' onClick={goToCart} />
                    {totalItemsInCart > 0 && (
                        <div className="cart-count-badge">{totalItemsInCart}</div>
                    )}
                </div>
            </div>
            <div className='data-container'>
                <h2 className='h2'>Vegetables</h2>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <div key={item._id} className='item'>
                            <img src={getImageForIndex(index)} alt={`${item.name}`} className='item-image' />
                            <div className='item-details'>
                                <h3>{item.name}</h3>
                                <p><strong>{item.category}</strong></p>
                                <div className='item-actions'>
                                    <select
                                        style={{ width: '100px' }}
                                        onChange={e => handleSelectChange(e, index)}
                                        value={selectedWeights[index]}
                                    >
                                        {item.weightOptions.map(option => (
                                            <option key={option.weight} value={option.weight}>
                                                {option.weight}
                                            </option>
                                        ))}
                                    </select>
                                    {selectedPrices[index] !== null && (
                                        <p className='item-price'>Price: <strong>₹{selectedPrices[index]}</strong></p>
                                    )}
                                </div>
                                {showCounter[index] ? (
                                    <CounterButton index={index} count={counts[index]} />
                                ) : (
                                    <button className='button' onClick={() => handleAddClick(index)}>Add</button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </div>
    );
};

export default FV;
