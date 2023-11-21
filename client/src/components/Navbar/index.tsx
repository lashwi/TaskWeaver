import styles from './Navbar.module.css';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar() {
  return (
    <nav className="bg-surface-050/50 border-2 border-surface-100 rounded-xl backdrop-blur-2xl flex absolute top-4 left-4 right-4 z-20 justify-between items-center px-1 py-2">
      <div className={styles.icon}>
        <FolderOpenIcon className={styles.addButton} style={{ fontSize: '24px', color: 'black' }} /> {/* Replace with your folder icon path */}
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
