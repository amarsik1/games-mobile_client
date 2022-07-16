import Svg, {
  Rect, Mask, G, Path,
} from 'react-native-svg';

const ScissorsIcon = (props) => (
  <Svg
    width={80}
    height={80}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect
      width={80}
      height={80}
      rx={40}
      fill="#232586"
      style={{
        mixBlendMode: 'multiply',
      }}
      opacity={0.747}
    />
    <Mask
      id="a"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={80}
      height={80}
    >
      <Rect width={80} height={80} rx={40} fill="#fff" />
      <Rect width={80} height={80} rx={40} stroke="#fff" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.56 20.766a1.582 1.582 0 0 1 1.232-1.868 1.593 1.593 0 0 1 1.88 1.225l3.668 17.532a1.055 1.055 0 0 0 1.652.634c.342-.137.605-.447.655-.837l2.291-17.973a1.583 1.583 0 0 1 1.776-1.368 1.582 1.582 0 0 1 1.378 1.765L41.828 37.64c-.053.409.142.79.466 1.003.199.245.493.397.812.397.582 0 1.056-.47 1.056-1.049v-1.31c0-1.012.829-1.836 1.847-1.836s1.847.824 1.847 1.836v3.408c0 .578.474 1.048 1.056 1.048.582 0 1.055-.47 1.055-1.048v-1.911c.175-.078.622-.187.886-.187.753 0 1.414.613 1.414 1.311 0 4.87-.4 13.39-1.475 15.524-1.573 3.126-3.332 5.713-8.962 5.713-5.157 0-9.628-2.44-12.588-6.872-1.89-2.83-2.75-8.645.208-11.316.3-.27.917-.64 1.022-.702l.735 5.045a1.055 1.055 0 0 0 1.196.888 1.05 1.05 0 0 0 .894-1.188L29.57 20.829l-.012-.063Zm21.259 15.129c-.2 0-.556.04-.976.146-.311-1.87-1.969-3.293-3.906-3.293-.478 0-.948.096-1.39.263l1.64-12.872a3.633 3.633 0 0 0-.747-2.714 3.678 3.678 0 0 0-2.46-1.395 3.687 3.687 0 0 0-2.732.742 3.646 3.646 0 0 0-1.404 2.444L37.25 31.704 34.74 19.697c-.415-1.984-2.379-3.264-4.377-2.852-1.986.41-3.27 2.341-2.877 4.315l2.643 18.138c-.872.478-1.894 1.2-1.95 1.239-3.131 2.239-4.13 9.113-.67 14.29 3.364 5.037 8.455 7.81 14.334 7.81 6.816 0 9.095-3.395 10.844-6.872 1.675-3.328 1.694-15.926 1.694-16.46 0-1.848-1.63-3.409-3.562-3.41Z"
        fill="#fff"
      />
    </G>
  </Svg>
);

export default ScissorsIcon;