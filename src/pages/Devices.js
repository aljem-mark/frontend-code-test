import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { instance as axios, axiosAuth } from '@/common/axios/instance';
import Swal from 'sweetalert2';

function Devices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(['bearer']);

  const getDevices = async () => {
    try {
      const { data } = await axios.get('devices');
      setDevices(data.devices);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    removeCookie('bearer', { path: '/' });
  };

  const notify = async () => {
    try {
      const { data } = await axiosAuth.post('notify', {
        name: 'Aljem Mark Aviola',
        email: 'speakout.aljem@gmail.com',
        repoUrl: 'https://github.com/aljem-mark/frontend-code-test',
        message:
          "Don't be so picky, if there's a hole, there's a goal, even if she has a PP.",
      });
      Swal.fire({ icon: 'success', title: 'Success', text: data, timer: 2000 });
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Opss...', text: error.response.data });
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
    <div className="flex items-center justify-center bg-orange-1 h-screen text-white relative">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="relative h-32">
          <div className="text-center">
            <span className="block text-7xl font-light mb-2">
              {devices.length}
            </span>
            <div className="text-lg leading-tight">
              <p>DEVICES</p>
              <p>ONLINE</p>
            </div>
          </div>
          {devices.map((val, i) => (
            <span className={`orbit-dot orbit-dot--${i}`} key={i}></span>
          ))}
        </div>
      )}

      <div className="devices__buttons">
        <button
          className="uppercase text-xs text-black bg-white py-3 px-8 rounded font-bold"
          onClick={notify}
        >
          Notify
        </button>
        <button
          className="uppercase text-xs text-white bg-gray-800 py-3 px-8 rounded font-bold"
          onClick={logOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default Devices;
