const DeliveryOnTimeDetail = ({ apiData }) => {
    
    return (
        <div>
            <p>Story Points: {apiData["story_points"].length}</p>
            <p>BV: {apiData["BV"].length}</p>
        </div>
    );
};
      

export default DeliveryOnTimeDetail;
