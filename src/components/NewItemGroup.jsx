import React, { useState, useRef } from 'react';
import Quagga from 'quagga'; // Import QuaggaJS
import '../styles/NewItemGroup.css';
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const NewItemGroup = () => {
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef(null);

  // Function to start the barcode scanner
  const startScanner = () => {
    setScanning(true);

    Quagga.init({
      inputStream: {
        type: 'LiveStream',
        target: scannerRef.current,
        constraints: {
          width: 640,
          height: 480,
          facingMode: 'environment' // Use back camera
        },
      },
      decoder: {
        readers: ['ean_reader', 'code_128_reader', 'upc_reader'] // Barcode formats
      },
    }, (err) => {
      if (err) {
        console.error("Quagga initialization failed:", err);
        return;
      }
      Quagga.start();
    });

    // Event when a barcode is detected
    Quagga.onDetected((result) => {
      if (result.codeResult) {
        setScannedBarcode(result.codeResult.code);
        stopScanner(); // Optionally stop the scanner after detecting a barcode
      }
    });
  };

  // Function to stop the scanner
  const stopScanner = () => {
    Quagga.stop();
    setScanning(false);
  };

  // Function to close the scanner
  const closeScanner = () => {
    stopScanner(); // Stops the scanner
    setScannedBarcode(''); // Clears the scanned result (optional)
  };

  return (
    <div className="home-container">
            <Navbar />
            <div className="main-container">
                <Sidebar />
    <div className="right-pane">
      
      {/* Top bar */}
      <div className="top-bar">
        <select className="search-dropdown">
          <option>Search Items...</option>
          {/* You can dynamically populate options here */}
        </select>

        <button className="barcode-button" onClick={startScanner}>
          Scan Barcode
        </button>
      </div>

      {/* Barcode Scanner View */}
      {scanning && (
        <div className="scanner-container" ref={scannerRef}>
          {/* Close button to stop the scanner */}
          <button className="close-button" onClick={closeScanner}>
            Close Scanner
          </button>
        </div>
      )}

      {/* Scanned Result */}
      {scannedBarcode && (
        <div className="scanned-result">
          <strong>Scanned Barcode:</strong> {scannedBarcode}
        </div>
      )}

      {/* Main form container */}
      <div className="main-content">

        {/* Basic Information */}
        <div className="form-section">
          <h3>Basic Information</h3>
          <input type="text" placeholder="Item Name" />
          <input type="text" placeholder="SKU" />
          <select>
            <option>Select Unit</option>
          </select>
          <input type="file" />
        </div>

        {/* Sales Information */}
        <div className="form-section">
          <h3>Sales Information</h3>
          <input type="text" placeholder="Selling Price" />
          <input type="text" placeholder="Cost Price" />
          <select>
            <option>Select Sales Account</option>
          </select>
          <select>
            <option>Select COGS Account</option>
          </select>
          <textarea placeholder="Description Left"></textarea>
          <textarea placeholder="Description Right"></textarea>
          <select>
            <option>Select Vendor</option>
          </select>
        </div>

        {/* Inventory Information */}
        <div className="form-section">
          <h3>Inventory Information</h3>
          <div className="checkbox-field">
            <input type="checkbox" />
            <label>Track Inventory</label>
          </div>
          <select>
            <option>Select Inventory Account</option>
          </select>
          <select>
            <option>Select Valuation Method</option>
          </select>
          <input type="text" placeholder="Opening Stock" />
          <input type="text" placeholder="Opening Rate" />
          <input type="text" placeholder="Reorder Point" />
        </div>

      </div>

      {/* Bottom Save/Cancel buttons */}
      <div className="bottom-buttons">
        <button className="save-button">Save</button>
        <button className="cancel-button">Cancel</button>
      </div>
      </div>

</div>
    </div>
  );
};

export default NewItemGroup;