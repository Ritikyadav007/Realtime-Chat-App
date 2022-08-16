import allStrings from '../../i8n/en-us';
import { titleCase } from '../../Utils/methods';
import './ChooseProfile.css';

type ChooseProfileProps = { handleImage: Function };

export default function ChooseProfile(props: ChooseProfileProps) {
  const { handleImage } = props;
  const { CHOOSE_PROFILE } = allStrings;
  return (
    <div>
      <input
        type="file"
        id="file-input"
        onChange={(event) => {
          handleImage(event.target.files);
        }}
      />
      <label htmlFor="file-input">{titleCase(CHOOSE_PROFILE)}</label>
    </div>
  );
}
