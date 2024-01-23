import {FC} from "react";
import styles from "./Layout.module.scss";
import {Outlet} from "react-router-dom";

const Layout: FC = () => {
    return <main className={styles.Layout}>
        <Outlet />
    </main>
}

export default Layout;
