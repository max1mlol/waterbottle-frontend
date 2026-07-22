import {Link} from "react-router-dom";

const Vendors = () => {

    const vendorBottles = [
        {id:1, title:"One",},
        {id:2, title:"Two",},
        {id:3, title:"Three",}
    ]
    return (
        <div>
            <h1>Vendor Page</h1>
            <ul>
                {vendorBottles.map((item) => (
                    <li key={item.id}>
                        <Link to={`/vendor/${item.id}`}>
                            <h2>{item.title}</h2>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Vendors;