import { useState, useEffect } from 'react';
import { instance as axios } from '@/common/axios/instance';

function Devices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDevices = async () => {
    try {
      const { data } = await axios.get('devices');
      setDevices(data.devices);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await getDevices();
      setLoading(false);
      const interval = setInterval(() => {
        getDevices();
      }, 5000);
      return () => clearInterval(interval);
    };
    fetch();
  }, []);

  return (
    <div className="flex items-center justify-center bg-orange-1 h-screen text-white">
      {loading ? 
        <div>Loading...</div> : 
        <div className="text-center">
          <span className="block text-7xl font-light mb-2">{devices.length}</span>
          <div className="text-lg leading-tight">
            <p>DEVICES</p>
            <p>ONLINE</p>
          </div>
        </div>
      }
    </div>
  );
}

export default Devices;
