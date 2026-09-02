import { IconBottle } from '@tabler/icons-react';

export default function NavBar() {
    return (
        <nav className="nav">
            <a href="/" className="site-title">
                <div>
                    <IconBottle stroke={2} />
                    Waterbottle
                </div>
            </a>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/vendors">Vendor</a>
                </li>
                <li>
                    <a href="/bottles">Bottle</a>
                </li>
                <li>
                    <a href="/box">Box</a>
                </li>
            </ul>
        </nav>
    )
}