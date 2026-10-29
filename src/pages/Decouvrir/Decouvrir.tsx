import Avatar from '../../components/atoms/Avatar/Avatar'
import CardDonut from '../../components/organisms/CardDonut/CardDonut'
import CheckBoxContent from '../../components/molecules/CheckBoxContent/CheckBoxContent'
import TitleToggle from '../../components/molecules/TitleToggle/TitleToggle'
import './Decouvrir.css'

function Decouvrir() {
  return (
    <main className="decouvrir">
      <h1 className="decouvrir__heading">Découvrir</h1>
      <div className="decouvrir__top">
        <a className="decouvrir__profil" href="/profil">
          <Avatar userType="cauchemar" label="Mon profil" />
        </a>
        <ul className="decouvrir__avatars" aria-label="Rêveurs à découvrir">
        <li>
          <Avatar label="Hugo, rêveur" />
        </li>
        <li>
          <Avatar userType="cauchemar" label="Léa, cauchemar" />
        </li>
        </ul>
      </div>
      <CardDonut title="Mes nuits" value={30} trend={-12} legend="Rêves lucides" />
      <CheckBoxContent label="Me rappeler de noter mes rêves" />
      <TitleToggle title="Mode nuit" />
    </main>
  )
}

export default Decouvrir
