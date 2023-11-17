import styles from './Navbar.module.css';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar() {
  return (
    <nav className={`${styles.navBar} absolute top-0 left-0 z-20`}>
      <div className={styles.icon}>
        <FolderOpenIcon className={styles.addButton} style={{ fontSize: '40px', color: 'black' }} /> {/* Replace with your folder icon path */}
      </div>
      <input type="text" className={styles.titleInput} placeholder="Title" />
      <div className={styles.navigationButtons}>
        <UndoIcon className={styles.addButton} /> {/* Replace with actual icons */}
        <RedoIcon className={styles.addButton} /> {/* Replace with actual icons */}
      </div>
      <div className={styles.userArea}>
        <button className={styles.loginButton}>Login</button>
        <button className={styles.profileButton}>
          <AccountCircleIcon /> {/* Replace with your user icon path */}
        </button>
      </div>
    </nav>
  );
};
