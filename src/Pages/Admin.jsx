import React, { useEffect, useState } from "react";
import BarGraph from "../components/BarGraph";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function Admin() {
    const [data, setData] = useState({
        category_6: 100,
        category_7: 80,
        category_8: 60,
        category_9: 40,
        category_10: 20,
    });
    const [details, setDetails] = useState({});
    const [selectedOption, setSelectedOption] = useState("yes");

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const fetchData = async () => {
        const id = localStorage.getItem("id");
        const response = await axios.get(`https://stg.dhunjam.in/account/admin/${id}`)
        setData(response.data.data.amount);
        setDetails({
            id: response.data.data.id,
            name: response.data.data.name,
            location: response.data.data.location,
            charge_customers: response.data.data.charge_customers,
        })
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmitClick = async () => {
        const id = localStorage.getItem("id");
        const response = await axios.put(`https://stg.dhunjam.in/account/admin/${id}`, { amount: data });
        if(response){
            if(response?.status === 200){
                toast.success("Amount updated");
                setData(response.data.data.amount);
            }
            else{
                toast.error("Try Again");
            }
        }
    };
    const handleInputBlur = () => {
        if (data.category_6 < 99) {
            setData((prev) => {
                return { ...prev, category_6: 99 };
            });
            console.log("errrrr");
            toast.error("custom song amount should be minimum 99");
        }
        if (data?.category_7 < 79) {
            setData((prev) => {
                return { ...prev, category_7: 79 };
            });
            toast.error("custom song amount should be minimum 79");
        }
        if (data?.category_8 < 59) {
            setData((prev) => {
                return { ...prev, category_8: 59 };
            });
            toast.error("custom song amount should be minimum 59");
        }
        if (data?.category_9 < 39) {
            setData((prev) => {
                return { ...prev, category_9: 39 };
            });
            toast.error("custom song amount should be minimum 39");
        }
        if (data?.category_10 < 19) {
            setData((prev) => {
                return { ...prev, category_10: 19 };
            });
            toast.error("custom song amount should be minimum 19");
        }
    };
    return (
        <>
        <Toaster />
        <div id="adminDIV">
            <h1>
                {details.name}, {details.location} on Dhun Jam
            </h1>
            <div id="detailsContainer">
                <div id="container">
                    <div id="items">Do you want to charge your customers:</div>
                    <div id="items">
                        <label>
                            <input
                                className="smallInput"
                                type="radio"
                                value="yes"
                                checked={selectedOption === "yes"}
                                onChange={handleOptionChange}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                className="smallInput"
                                type="radio"
                                value="no"
                                checked={selectedOption === "no"}
                                onChange={handleOptionChange}
                            />
                            No
                        </label>
                    </div>
                </div>
                <div id="container">
                    <div id="items">custom song request amount:</div>
                    <div id="items">
                        <input
                            disabled={selectedOption === "no"}
                            className="input"
                            type="number"
                            value={data?.category_6}
                            onChange={(e) => {
                                setData((prev) => {
                                    return {
                                        ...prev,
                                        category_6: parseInt(e.target.value),
                                    };
                                });
                            }}
                            onBlur={handleInputBlur}
                            min={99}
                        ></input>
                    </div>
                </div>
                <div id="container">
                    <div id="items">
                        custom song request amount high to low:
                    </div>
                    <div id="items">
                        <input
                            disabled={selectedOption === "no"}
                            type="number"
                            className="smallInput"
                            value={data?.category_7}
                            onChange={(e) => {
                                setData((prev) => {
                                    return {
                                        ...prev,
                                        category_7: parseInt(e.target.value),
                                    };
                                });
                            }}
                            onBlur={handleInputBlur}
                            min={79}
                        ></input>
                        <input
                            disabled={selectedOption === "no"}
                            type="number"
                            className="smallInput"
                            value={data?.category_8}
                            onChange={(e) => {
                                setData((prev) => {
                                    return {
                                        ...prev,
                                        category_8: parseInt(e.target.value),
                                    };
                                });
                            }}
                            onBlur={handleInputBlur}
                            min={59}
                        ></input>
                        <input
                            disabled={selectedOption === "no"}
                            className="smallInput"
                            type="number"
                            value={data?.category_9}
                            onChange={(e) => {
                                setData((prev) => {
                                    return {
                                        ...prev,
                                        category_9: parseInt(e.target.value),
                                    };
                                });
                            }}
                            onBlur={handleInputBlur}
                            min={39}
                        ></input>
                        <input
                            disabled={selectedOption === "no"}
                            className="smallInput"
                            type="number"
                            value={data?.category_10}
                            onChange={(e) => {
                                setData((prev) => {
                                    return {
                                        ...prev,
                                        category_10: parseInt(e.target.value),
                                    };
                                });
                            }}
                            onBlur={handleInputBlur}
                            min={19}
                        ></input>
                    </div>
                </div>
            </div>
            <div>{selectedOption === "yes" && <BarGraph data={data} />}</div>
            <div>
                <button
                    onClick={handleSubmitClick}
                    disabled={selectedOption === "no"}
                    id="submitButton"
                >
                    Save
                </button>
            </div>
        </div>
        </>
    );
}