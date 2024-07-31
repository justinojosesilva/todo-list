import styles from './Header.module.css'
import rocketLog from '../assets/rocket.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={rocketLog} alt="Logo da aplicação" />
      <div className={styles.logo}>
        <span>to</span><span>do</span>
      </div>
    </header>
  )
}