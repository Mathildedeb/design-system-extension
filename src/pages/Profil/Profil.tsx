import Avatar from '../../components/atoms/Avatar/Avatar'
import './Profil.css'

function Profil() {
  return (
    <main className="profil">
      <a className="profil__back" href="/">
        <span aria-hidden="true">← </span>Retour à Découvrir
      </a>
      <h1 className="profil__heading">Mon profil</h1>
      <div className="profil__identity">
        <Avatar userType="cauchemar" label="" />
        <div>
          <p className="profil__name">Inès Moreau</p>
          <p className="profil__meta">Rêveuse depuis mars 2026 · 42 nuits notées</p>
        </div>
      </div>
    </main>
  )
}

export default Profil
