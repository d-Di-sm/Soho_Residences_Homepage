import {
  CameraControls,
  ContactShadows,
  Environment,
  Float,
  Html,
  SoftShadows,
} from "@react-three/drei";
import { motion } from "framer-motion";

import Residencial01 from "./Building/Residencial01";
import Residencial02 from "./Building/Residencial02";
import Residencial03 from "./Building/Residencial03";

// import Terrain from "./Building/Terrain";
import Terreno from "./Building/Terreno.jsx";

import Amenities from "./Building/Amenities";
import Casona01 from "./Building/Casona01";
import Casona02 from "./Building/Casona02";
import Casona03 from "./Building/Casona03";
import Casona04 from "./Building/Casona04";
import Basamento from "./Building/Basamento";
import Talud from "./Building/Talud";
import Furniture from "./Building/Furniture";
import Agua from "./Building/Agua";

import Arbol02 from "./Vegetacion/Arbol02";
import Arbol06 from "./Vegetacion/Arbol06";
// import Arbustos01 from "./Vegetacion/Arbustos01";
// import Arbustos02 from "./Vegetacion/Arbustos02";
import Cactus01 from "./Vegetacion/Cactus01";
import Palmera02 from "./Vegetacion/Palmera02";
import Palmera04 from "./Vegetacion/Palmera04";
import Palmera05 from "./Vegetacion/Palmera05";
import Palmera11 from "./Vegetacion/Palmera11";

import TerrenoLineasMultiples from "../Curves.jsx";

import {
  CAKE_TRANSITION_DURATION,
  TRANSITION_DURATION,
  cakeAtom,
  isMobileAtom,
  screenAtom,
  transitionAtom,
  annotation3d,
} from "./UI";
import { atom, useAtom } from "jotai";
import { degToRad } from "three/src/math/MathUtils.js";

import { floatingPanelActive } from "./Overlay.jsx";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import ResidencialAreasA from "./Building/Residencial_Areas_A_Final.jsx";
import ResidencialAreasB from "./Building/Residencial_Areas_B_Final.jsx";
import { button, useControls } from "leva";
import PruebaTex from "./Building/Prueba_Tex.jsx";
import PruebaTe from "./Building/Prueba_Te.jsx";
import PruebaC03 from "./Building/Prueba_C03.jsx";

export const section = atom(0);

export const sections = atom(["intro", "titanium", "camera", "resi", "casita"]);

const CAMERA_LIMITS_BY_ANNOTATION = {
  residences: {
    maxDistance: 120,
    minDistance: 80,
    maxPolarAngle: degToRad(80),
    minAzimuthAngle: degToRad(10),
    maxAzimuthAngle: degToRad(100),
  },
  amenities: {
    maxDistance: 90,
    minDistance: 60,
    maxPolarAngle: degToRad(75),
    minAzimuthAngle: degToRad(10),
    maxAzimuthAngle: degToRad(60),
  },
  casita: {
    maxDistance: 70,
    minDistance: 44,
    maxPolarAngle: degToRad(75.5),
    minAzimuthAngle: degToRad(-10),
    maxAzimuthAngle: degToRad(40),
  },
  masterplan: {
    maxDistance: 320,
    minDistance: 180,
    maxPolarAngle: degToRad(76),
    minAzimuthAngle: degToRad(-100),
    maxAzimuthAngle: degToRad(80),
  },
  base: {
    maxDistance: 320,
    minDistance: 180,
    maxPolarAngle: degToRad(76),
    minAzimuthAngle: degToRad(-50),
    maxAzimuthAngle: degToRad(60),
  },
};

const CAMERA_LIMITS_BY_ANNOTATION_MOBILE = {
  residences: {
    maxDistance: 180,
    minDistance: 140,
    maxPolarAngle: degToRad(70),
    minAzimuthAngle: degToRad(-10),
    maxAzimuthAngle: degToRad(75),
  },
  amenities: {
    maxDistance: 130,
    minDistance: 80,
    maxPolarAngle: degToRad(75),
    minAzimuthAngle: degToRad(-10),
    maxAzimuthAngle: degToRad(50),
  },
  casita: {
    maxDistance: 140,
    minDistance: 70,
    maxPolarAngle: degToRad(85),
    minAzimuthAngle: degToRad(-10),
    maxAzimuthAngle: degToRad(40),
  },
  masterplan: {
    maxDistance: 400,
    minDistance: 220,
    maxPolarAngle: degToRad(72),
    minAzimuthAngle: degToRad(-70),
    maxAzimuthAngle: degToRad(65),
  },
  base: {
    maxDistance: 550,
    minDistance: 350,
    maxPolarAngle: degToRad(60),
    minAzimuthAngle: degToRad(-80),
    maxAzimuthAngle: degToRad(60),
  },
};

const cameraPositions = {
  intro: [
    94.88715402309754, 111.6694578807425, 202.37511175736282, 8.92953022022402,
    -22.224727676128047, 10.07417867489219,
  ],
  titanium: [-14.5, 109.8, 246.1, 3.4, -5.0, 2.5],
  camera: [
    -73.01054000346974, 42.78772159455869, 111.8079878008047,
    -120.47428040136617, 26.304063459044073, 47.131211268837035,
  ],
  resi: [
    -76.51528344358627, 44.70187188086646, 111.63662191958312,
    -99.02479849317754, 8.640329098189241, 41.633122542631476,
  ],
  casita: [
    -35.299270939844504, 28.68401895247473, 96.06585225259698,
    -53.23740010799345, 11.597048851153064, 26.426469667539145,
  ],
};

const cameraPositionsSmallScreen = {
  // intro: [
  //   -321.3561195123034, 258.18734119767726, 126.39247631777911,
  //   0.9494886774927435, -39.68538612835543, 39.2898573765266,
  // ],
  intro: [
    472.7280228767714, 300.21753428115727, 510.70515084030956,
    64.51288788534964, -109.35823055122064, 101.93344080211563,
  ],
  // titanium: [
  //   307.544655088891, 213.2655414739, 135.92488636759083, 5.877448178398372,
  //   -39.533157985069934, 43.41178072977719,
  // ],
  titanium: [
    333.71629193431596, 164.1560870417169, 163.83331067055855,
    5.877448178398372, -39.533157985069934, 43.41178072977719,
  ],
  camera: [
    -59.57749386378976, 77.80932154861148, 196.96994294961823,
    -115.35772911069475, -3.7019364485918222, 40.627883101249665,
  ],
  resi: [
    -57.27045249359533, 71.64457810965422, 162.14951867107695,
    -96.36063233089962, 9.019852988750673, 40.58095649384126,
  ],
  casita: [
    1.1901121776266876, 24.321244478973043, 114.96227815344739,
    -62.20118713978627, 16.967052580882484, 32.60700671391736,
  ],
};

export const Experience = () => {
  const [screen] = useAtom(screenAtom);
  const [annotation] = useAtom(annotation3d);

  const [transition] = useAtom(transitionAtom);
  const [isMobile] = useAtom(isMobileAtom);

  const handleAnnotationClick = (
    imageName,
    annotationName,
    // meshName = null,
    event,
    description = "",
    section = null,
  ) => {
    event?.stopPropagation?.();
    // setCameraMode(CameraModes.CASITA)

    //Dispatch custom event with image and annotation information
    window.dispatchEvent(
      new CustomEvent("annotation-click", {
        detail: {
          image: imageName,
          annotation: annotationName,
          description: description,
          section,
          // meshName: meshName,
          // source: 'annotation'
        },
      }),
    );
  };

  const [sectionCam, setSectionCam] = useAtom(section);

  const controls = useRef();

  const [introFinished, setIntroFinished] = useState(false);

  const intro = async () => {
    controls.current.setLookAt(
      94.88715402309754,
      111.6694578807425,
      202.37511175736282,
      8.92953022022402,
      -22.224727676128047,
      10.07417867489219,
      false,
    );
    // await controls.current.dolly(3, true);
    // await controls.current.rotate(degToRad(45), degToRad(25), true);

    setIntroFinished(true);
    playTransition();
  };

  const [sectionsArr] = useAtom(sections);

  const playTransition = () => {
    if (!controls.current) return;
    const key = sectionsArr[sectionCam]; // "intro" | "titanium" | ...
    const pose = isMobile
      ? cameraPositionsSmallScreen[key]
      : cameraPositions[key];
    if (!pose) return;
    controls.current.setLookAt(...pose, true);
  };

  // const playTransition = () => {
  //   controls.current.setLookAt(...cameraPositions[sections[section]], true);
  // };

  useControls("Helper", {
    getLookAt: button(() => {
      const position = controls.current.getPosition();
      const target = controls.current.getTarget();
      console.log([...position, ...target]);
    }),
    // toJson: button(() => console.log(controls.current.toJSON())),
  });

  useEffect(() => {
    // intro();
    const raf = requestAnimationFrame(() => controls.current && intro());
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const limitsMap = isMobile
      ? CAMERA_LIMITS_BY_ANNOTATION_MOBILE
      : CAMERA_LIMITS_BY_ANNOTATION;
    const limits = limitsMap[annotation] ?? limitsMap.base;
    const raf = requestAnimationFrame(() => {
      if (controls.current) {
        const ACTION = controls.current.constructor?.ACTION;

        controls.current.maxDistance = limits.maxDistance;
        controls.current.minDistance = limits.minDistance;
        controls.current.maxPolarAngle = limits.maxPolarAngle;
        controls.current.minAzimuthAngle = limits.minAzimuthAngle;
        controls.current.maxAzimuthAngle = limits.maxAzimuthAngle;

        // Disable pan: right-drag and touch truck
        if (ACTION) {
          controls.current.mouseButtons.right = ACTION.NONE;
          controls.current.touches.two = ACTION.TOUCH_DOLLY_ROTATE;
          controls.current.touches.three = ACTION.TOUCH_DOLLY_ROTATE;
        }
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [annotation, isMobile]);

  useEffect(() => {
    if (!introFinished) {
      return;
    }
    playTransition();
  }, [sectionCam]);

  return (
    <>
      <group position-y={isMobile ? -0.66 : -1}>
        {/* HOME */}
        <group visible={screen === "home" || screen === "pers"}>
          {/* <CameraControls
            ref={controls}
            maxDistance={350}
            minDistance={94}
            maxPolarAngle={degToRad(70)}
            minAzimuthAngle={degToRad(-100)}
            maxAzimuthAngle={degToRad(70)}
          /> */}
          <CameraControls ref={controls} />
          <SoftShadows />

          {/* <Terrain /> */}
          <Terreno />

          <Residencial01 />

          <Residencial02 />
          <Residencial02
            rotation={[0, (Math.PI / 180) * 9, 0]}
            position={[34.37, 0, 18.19]}
          />
          <Residencial02
            rotation={[0, (Math.PI / 180) * 15, 0]}
            position={[71.75, 0, 31.1]}
          />
          <Residencial02
            rotation={[0, (Math.PI / 180) * 32, 0]}
            position={[110.58, 0, 34.13]}
          />

          <Residencial03 />

          <Amenities />

          <Casona01 />
          {/* <PruebaC03 /> */}
          <Casona02 />
          <Casona03 />
          <Casona04 />
          <Casona04 position={[-50.1, 0.15, -16.18]} />

          <Basamento />

          {!isMobile && <Arbol02 />}
          {!isMobile && <Arbol06 />}

          {!isMobile && <Cactus01 />}
          {!isMobile && <Palmera02 />}
          {!isMobile && <Palmera04 />}
          {!isMobile && <Palmera05 />}
          {!isMobile && <Palmera11 />}

          {/* <Arbustos01 />
          <Arbustos02 /> */}

          <Furniture />

          <Talud />
          <Agua />

          <ResidencialAreasA />
          <ResidencialAreasB />

          <TerrenoLineasMultiples />

          <Environment preset="dawn" background blur={4} />
        </group>

        {/* MENU */}
        <group position-y={isMobile ? 0.42 : 0.75} visible={screen === "menu"}>
          <Float scale={isMobile ? 0.75 : 1}>
            <Casona02 />
          </Float>
        </group>
        <ContactShadows opacity={0.42} scale={25} />

        <mesh rotation-x={degToRad(-90)} position-y={-0.001}>
          <planeGeometry args={[40, 40]} />
          <meshBasicMaterial color={"white"} toneMapped={false} />
        </mesh>
      </group>

      {!transition && annotation === "amenities" && (
        <>
          <Annotation_3d
            nombre="POOL"
            rotation={[0, -Math.PI * 0.4, 0]}
            position={[-88, 30, 65]}
            scale={ANNOTATION_SCALE.amenities}
            onAnnotationClick={() =>
              handleAnnotationClick(
                "./IMG/AM_AL_HD.png",
                "POOL",
                undefined,
                "As the day moves into evening, the mood shifts without effort.\nComfortable seating, attentive service, and an unhurried\natmosphere make it a place to linger, connect, and settle into the\nrhythm of the setting.",
              )
            }
          />

          <Annotation_3d
            nombre="POOL BAR"
            rotation={[0, -Math.PI * 0.4, 0]}
            position={[-84, 30, 50]}
            scale={ANNOTATION_SCALE.amenities}
            onAnnotationClick={() =>
              handleAnnotationClick(
                "./IMG/ARR_HD.png",
                "POOL BAR",
                undefined,
                "The pool bar is a relaxed gathering point designed to be enjoyed\nthroughout the day. It offers drinks and light dishes that fit\nnaturally into time spent outdoors, whether between swims or\nduring long, easy afternoons.",
              )
            }
          />

          <Annotation_3d
            nombre="KIDS & TEENS CLUB"
            rotation={[0, -Math.PI * 0.4, 0]}
            position={[-90.5, 23, 77.4]}
            scale={ANNOTATION_SCALE.amenities}
            onAnnotationClick={() =>
              handleAnnotationClick(
                "./IMG/AM_HD.png",
                "KIDS & TEENS CLUB",
                undefined,
                "Supporting everything from creative activities to quiet downtime, the\nkids and teens club offers an environment that feels familiar and\nwelcoming. The space includes a juice bar, chalkboard walls for\ drawing and ideas, games areas, and a screening room for films, along\nwith an outdoor terrace designed especially for younger members.",
              )
            }
          />

          <Annotation_3d
            nombre="HEALTH CLUB"
            rotation={[0, -Math.PI * 0.4, 0]}
            position={[-78.7, 23, 67]}
            scale={ANNOTATION_SCALE.amenities}
            onAnnotationClick={() =>
              handleAnnotationClick(
                "./IMG/AM_HD.png",
                "HEALTH CLUB",
                undefined,
                "The health club is designed as a balanced space for movement and\nrestoration, bringing together a fully equipped indoor gym and a large\noutdoor training area, along with a dedicated studio room that can be\nused for yoga, Pilates, or other practices. A private terrace extends the\nexperience outdoors, while a spa with sauna, steam room, and cold\nplunges creates space to slow down and reset. A juice bar completes the\nsetting, offering a natural place to pause between sessions.",
              )
            }
          />
        </>
      )}

      {!transition && annotation === "casita" && (
        <>
          <Annotation_3d
            nombre="POOL HOUSE"
            rotation={[0, -Math.PI * 0.4, 0]}
            position={[-50, 24.8, 51.5]}
            scale={ANNOTATION_SCALE.casita}
            onAnnotationClick={(event) =>
              handleAnnotationClick(
                "./IMG/C01_AL_HD.png",
                "POOL HOUSE",
                // "CA_01",
                event,
                "Designed to blend comfort with ease,\nthe Casitas feel settled into their surroundings from\nthe moment you arrive.",
                "casita",
              )
            }
          />

          <Annotation_3d
            nombre="TERRACE"
            rotation={[0, -Math.PI * 0.4, 0]}
            position={[-60, 25, 55.5]}
            scale={ANNOTATION_SCALE.casita}
            onAnnotationClick={(event) =>
              handleAnnotationClick(
                "./IMG/C01_AL_HD.png",
                "TERRACE",
                // "CA_01",
                event,
                "The layout supports both everyday living and hosting, offering a\nsense of space that feels natural rather than formal.",
                "casita",
              )
            }
          />

          <Annotation_3d
            nombre="MAIN HOUSE"
            rotation={[0, -Math.PI * 0.4, 0]}
            position={[-35.8, 22, 56.5]}
            scale={ANNOTATION_SCALE.casita}
            onAnnotationClick={(event) =>
              handleAnnotationClick(
                "./IMG/C01_HD.png",
                "MAIN HOUSE",
                // "CA_01",
                event,
                "The Casitas are standalone three-bedroom homes designed for\nprivacy and a slower pace. Each residence opens onto generous\noutdoor living areas, with a private pool, Jacuzzi, and outdoor\nkitchen that encourage time spent outside.",
                "casita",
              )
            }
          />
        </>
      )}

      {!transition && annotation === "masterplan" && (
        <>
          <Annotation_3d
            nombre="AMENITIES"
            rotation={[0, -Math.PI * 0.4, 0]}
            position={[-95, 30, 65]}
            scale={ANNOTATION_SCALE.masterplan}
            onAnnotationClick={() =>
              handleAnnotationClick(
                "./IMG/AM_HD.png",
                "AMENITIES",
                undefined,
                "Set along a rocky hillside, the infinity pool looks out over the Sea of\n Cortez, with open views that unfold naturally from the pool deck and bar.\n It is designed as a place to spend the day, moving easily between the\n water, shaded seating, and relaxed social moments.\n",
              )
            }
          />

          <Annotation_3d
            nombre="WEST APARTMENTS"
            rotation={[0, -Math.PI * 0.4, 0]}
            position={[-110, 34, 47]}
            scale={ANNOTATION_SCALE.masterplan}
            onAnnotationClick={() =>
              handleAnnotationClick(
                "./IMG/R01_HD.png",
                "WEST APARTMENTS",
                undefined,
                "Set along the hillside, the Apartments are designed to feel private and quietly\nconnected to their surroundings. Open living spaces flow naturally onto\nterraces, creating an easy relationship between indoors and out.",
              )
            }
          />

          <Annotation_3d
            nombre="Coming Soon"
            rotation={[0, -Math.PI * 0.4, 0]}
            position={[5, 26, 23]}
            scale={ANNOTATION_SCALE.masterplan}
            onAnnotationClick={() =>
              handleAnnotationClick(
                "./IMG/R01_02_HD.png",
                "Coming Soon",
                undefined,
                "Garden and penthouse residences include private pools, offering a more\npersonal way to enjoy time at home. Each apartment is shaped around a sense of\ncalm, with layouts that support everyday living rather than formality.",
              )
            }
          />

          <Annotation_3d
            nombre="Coming Soon"
            rotation={[0, -Math.PI * 0.4, 0]}
            position={[43, 26, 40]}
            scale={ANNOTATION_SCALE.masterplan}
            onAnnotationClick={() =>
              handleAnnotationClick(
                "./IMG/R01_02_HD.png",
                "Coming Soon",
                undefined,
                "Garden and penthouse residences include private pools, offering a more\npersonal way to enjoy time at home. Each apartment is shaped around a sense of\ncalm, with layouts that support everyday living rather than formality.",
              )
            }
          />

          <Annotation_3d
            nombre="Coming Soon"
            rotation={[0, -Math.PI * 0.4, 0]}
            position={[82, 26, 52]}
            scale={ANNOTATION_SCALE.masterplan}
            onAnnotationClick={() =>
              handleAnnotationClick(
                "./IMG/R01_02_HD.png",
                "Coming Soon",
                undefined,
                "Garden and penthouse residences include private pools, offering a more\npersonal way to enjoy time at home. Each apartment is shaped around a sense of\ncalm, with layouts that support everyday living rather than formality.",
              )
            }
          />

          <Annotation_3d
            nombre="Coming Soon"
            rotation={[0, -Math.PI * 0.4, 0]}
            position={[126, 26, 52]}
            scale={ANNOTATION_SCALE.masterplan}
            onAnnotationClick={() =>
              handleAnnotationClick(
                "./IMG/R01_02_HD.png",
                "Coming Soon",
                undefined,
                "Garden and penthouse residences include private pools, offering a more\npersonal way to enjoy time at home. Each apartment is shaped around a sense of\ncalm, with layouts that support everyday living rather than formality.",
              )
            }
          />

          <Annotation_3d
            nombre="THE CASITA"
            rotation={[0, -Math.PI * 0.4, 0]}
            position={[-50, 26, 51]}
            scale={ANNOTATION_SCALE.masterplan}
            onAnnotationClick={(event) =>
              handleAnnotationClick(
                "./IMG/C01_HD.png",
                "THE CASITA A2",
                // "CA_01",
                event,
                "The Casitas are standalone three-bedroom homes designed for\nprivacy and a slower pace. Each residence opens onto generous\noutdoor living areas, with a private pool, Jacuzzi, and outdoor\nkitchen that encourage time spent outside.",
              )
            }
          />

          <Annotation_3d
            nombre="Coming Soon"
            rotation={[0, -Math.PI * 0.4, 0]}
            position={[-58, 30, 16]}
            scale={ANNOTATION_SCALE.masterplan}
            onAnnotationClick={() =>
              handleAnnotationClick(
                "./IMG/C01_HD.png",
                "Coming Soon",
                undefined,
                "The layout supports both everyday living and hosting, offering a\nsense of space that feels natural rather than formal. Designed to\nblend comfort with ease, the Casitas feel settled into their\nsurroundings from the moment you arrive.",
              )
            }
          />

          <Annotation_3d
            nombre="ACCESS"
            rotation={[0, -Math.PI * 0.4, 0]}
            position={[-140, 35, 24]}
            scale={ANNOTATION_SCALE.masterplan}
            onAnnotationClick={() =>
              handleAnnotationClick(
                "./IMG/Acc_HD.png",
                "ACCESS",
                undefined,
                "Soho House Los Cabos will be home to Soho House’s\nfirst residences. Situated close to our House, there\nwill be three types of properties:\n \nApartments, Casitas and Casonas.\n \nThe residences will be fully serviced and designed\nin our Soho House style.",
              )
            }
          />

          <Annotation_3d
            nombre="THE CASONA"
            rotation={[0, -Math.PI * 0.4, 0]}
            position={[-1, 24, 59]}
            scale={ANNOTATION_SCALE.masterplan}
            onAnnotationClick={() =>
              handleAnnotationClick(
                "./IMG/CA_HD.png",
                "THE CASONA B1",
                undefined,
                "The Casonas are arranged across two floors, with four bedrooms\ndesigned to feel like independent retreats. Open-plan living areas\nform the heart of the home, connecting naturally to expansive\nterraces for shared time indoors and out.",
              )
            }
          />

          <Annotation_3d
            nombre="Coming Soon"
            rotation={[0, -Math.PI * 0.4, 0]}
            position={[59, 23.1, 80]}
            scale={ANNOTATION_SCALE.masterplan}
            onAnnotationClick={() =>
              handleAnnotationClick(
                "./IMG/CA_HD.png",
                "Coming Soon",
                undefined,
                "Each residence includes a private pool, Jacuzzi, and outdoor kitchen,\ncreating spaces that support both quiet moments and gatherings. The\nlayout balances togetherness with privacy, allowing the home to\nadapt easily to different rhythms of living.",
              )
            }
          />

          <Annotation_3d
            nombre="Coming Soon"
            rotation={[0, -Math.PI * 0.4, 0]}
            position={[109, 23, 95]}
            scale={ANNOTATION_SCALE.masterplan}
            onAnnotationClick={() =>
              handleAnnotationClick(
                "./IMG/CA_HD.png",
                "Coming Soon",
                undefined,
                "Each residence includes a private pool, Jacuzzi, and outdoor kitchen,\ncreating spaces that support both quiet moments and gatherings. The\nlayout balances togetherness with privacy, allowing the home to\nadapt easily to different rhythms of living.",
              )
            }
          />
        </>
      )}
    </>
  );
};

const ANNOTATION_SCALE = {
  masterplan: 1.5,
  amenities: 0.6,
  casita: 0.6,
};

const Annotation_3d = ({
  children,
  nombre,
  position,
  onAnnotationClick,
  scale = 1,
  ...props
}) => {
  const [hovered, setHovered] = useState(false);
  const [isFloatingPanelActive] = useAtom(floatingPanelActive);

  const ref = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (ref.current) {
      ref.current.lookAt(camera.position);
    }
  });

  // const handleClick = () => {
  const handleClick = (event) => {
    // Evita que el raycasting continúe hacia los meshes residenciales subyacentes
    event?.stopPropagation?.();

    if (onAnnotationClick) {
      // onAnnotationClick();
      onAnnotationClick(event);
    }
  };

  // Don't render if floating panel is active
  useEffect(() => {
    if (isFloatingPanelActive) {
      setHovered(false);
    }
  }, [isFloatingPanelActive]);

  if (isFloatingPanelActive) {
    return null;
  }

  return (
    <>
      <group ref={ref} position={position} scale={scale} {...props}>
        <Html transform position={[0, 0, 0]}>
          <div className="annotation-button-wrapper">
            <motion.button
              className={"circle-button-views"}
              onClick={handleClick}
              onPointerEnter={(event) => {
                event?.stopPropagation?.();
                setHovered(true);
              }}
              onPointerLeave={(event) => {
                event?.stopPropagation?.();
                setHovered(false);
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.6, 1],
              }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0,
              }}
            />
          </div>
        </Html>
      </group>

      {hovered && (
        <Html
          transform={false}
          position={[position[0] + 0.05, position[1] + 0.1, position[2]]}
        >
          <motion.div
            className="tooltip-3d"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
          >
            {nombre}
          </motion.div>
        </Html>
      )}
    </>
  );
};
