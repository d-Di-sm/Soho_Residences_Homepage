import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./Overlay.css";
import { Button } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import { atom, useAtom } from "jotai";
import { isMobileAtom } from "./UI";

// Listas de imágenes para carousel por tipología (orden: A 2BR, A 3BR, A 4BR, B 2BR, B 3BR, B 4BR, CA)
const carouselImagesByKey = {
  "2BR_G_A": [
    "/FP_FAC/A_2BR_01_FP.png",
    "/FP_FAC/A_2BR_01_FA.png",
    "/Images/2BR_01.jpg",
    "/Images/2BR_02.jpg",
    "/Images/2BR_03.jpg",
    "/Images/2BR_04.jpg",
    "/Images/2BR_05.jpg",
    "/Images/2BR_06.jpg",
  ],
  "2BR_N1_A": [
    "/FP_FAC/A_2BR_02_FP.png",
    "/FP_FAC/A_2BR_02_FA.png",
    "/Images/2BR_01.jpg",
    "/Images/2BR_02.jpg",
    "/Images/2BR_03.jpg",
    "/Images/2BR_04.jpg",
    "/Images/2BR_05.jpg",
    "/Images/2BR_06.jpg",
  ],
  "2BR_N2_A": [
    "/FP_FAC/A_2BR_03_FP.png",
    "/FP_FAC/A_2BR_03_FA.png",
    "/Images/2BR_01.jpg",
    "/Images/2BR_02.jpg",
    "/Images/2BR_03.jpg",
    "/Images/2BR_04.jpg",
    "/Images/2BR_05.jpg",
    "/Images/2BR_06.jpg",
  ],
  "3BR_G_A": [
    "/FP_FAC/A_3BR_01_FP.png",
    "/FP_FAC/A_3BR_01_FA.png",
    "/Images/3BR_01.jpg",
    "/Images/3BR_02.jpg",
    "/Images/3BR_03.jpg",
    "/Images/3BR_04.jpg",
    "/Images/3BR_05.jpg",
    "/Images/3BR_06.jpg",
  ],
  "3BR_N1_A": [
    "/FP_FAC/A_3BR_02_FP.png",
    "/FP_FAC/A_3BR_02_FA.png",
    "/Images/3BR_01.jpg",
    "/Images/3BR_02.jpg",
    "/Images/3BR_03.jpg",
    "/Images/3BR_04.jpg",
    "/Images/3BR_05.jpg",
    "/Images/3BR_06.jpg",
  ],
  "3BR_N2_A": [
    "/FP_FAC/A_3BR_03_FP.png",
    "/FP_FAC/A_3BR_03_FA.png",
    "/Images/3BR_01.jpg",
    "/Images/3BR_02.jpg",
    "/Images/3BR_03.jpg",
    "/Images/3BR_04.jpg",
    "/Images/3BR_05.jpg",
    "/Images/3BR_06.jpg",
  ],
  "4BR_A": [
    "/FP_FAC/A_4BR_04_FP01.png",
    "/FP_FAC/A_4BR_04_FP02.png",
    "/FP_FAC/A_4BR_04_FA.png",
    "/Images/4BR_01.jpg",
    "/Images/4BR_02.jpg",
    "/Images/4BR_03.jpg",
    "/Images/4BR_04.jpg",
    "/Images/4BR_05.jpg",
    "/Images/4BR_06.jpg",
    "/Images/4BR_07.jpg",
  ],
  "2BR_G_B": [
    "/FP_FAC/B_2BR_01_FP.png",
    "/FP_FAC/B_2BR_01_FA.png",
    "/Images/2BR_01.jpg",
    "/Images/2BR_02.jpg",
    "/Images/2BR_03.jpg",
    "/Images/2BR_04.jpg",
    "/Images/2BR_05.jpg",
    "/Images/2BR_06.jpg",
  ],
  "2BR_N1_B": [
    "/FP_FAC/B_2BR_02_FP.png",
    "/FP_FAC/B_2BR_02_FA.png",
    "/Images/2BR_01.jpg",
    "/Images/2BR_02.jpg",
    "/Images/2BR_03.jpg",
    "/Images/2BR_04.jpg",
    "/Images/2BR_05.jpg",
    "/Images/2BR_06.jpg",
  ],
  "2BR_N2_B": [
    "/FP_FAC/B_2BR_03_FP.png",
    "/FP_FAC/B_2BR_03_FA.png",
    "/Images/2BR_01.jpg",
    "/Images/2BR_02.jpg",
    "/Images/2BR_03.jpg",
    "/Images/2BR_04.jpg",
    "/Images/2BR_05.jpg",
    "/Images/2BR_06.jpg",
  ],
  "3BR_G_B": [
    "/FP_FAC/B_3BR_01_FP.png",
    "/FP_FAC/B_3BR_01_FA.png",
    "/Images/3BR_01.jpg",
    "/Images/3BR_02.jpg",
    "/Images/3BR_03.jpg",
    "/Images/3BR_04.jpg",
    "/Images/3BR_05.jpg",
    "/Images/3BR_06.jpg",
  ],
  "3BR_N1_B": [
    "/FP_FAC/B_3BR_02_FP.png",
    "/FP_FAC/B_3BR_02_FA.png",
    "/Images/3BR_01.jpg",
    "/Images/3BR_02.jpg",
    "/Images/3BR_03.jpg",
    "/Images/3BR_04.jpg",
    "/Images/3BR_05.jpg",
    "/Images/3BR_06.jpg",
  ],
  "3BR_N2_B": [
    "/FP_FAC/B_3BR_03_FP.png",
    "/FP_FAC/B_3BR_03_FA.png",
    "/Images/3BR_01.jpg",
    "/Images/3BR_02.jpg",
    "/Images/3BR_03.jpg",
    "/Images/3BR_04.jpg",
    "/Images/3BR_05.jpg",
    "/Images/3BR_06.jpg",
  ],
  "4BR_B": [
    "/FP_FAC/B_4BR_04_FP01.png",
    "/FP_FAC/B_4BR_04_FP02.png",
    "/FP_FAC/B_4BR_04_FA.png",
    "/Images/4BR_01.jpg",
    "/Images/4BR_02.jpg",
    "/Images/4BR_03.jpg",
    "/Images/4BR_04.jpg",
    "/Images/4BR_05.jpg",
    "/Images/4BR_06.jpg",
    "/Images/4BR_07.jpg",
  ],
  CA_01: [
    "/FP_FAC/CA_01_FP.png",
    "/FP_FAC/CA_01_FA.png",
    "/Images/CA_01.jpg",
    "/Images/CA_02.jpg",
    "/Images/CA_03.jpg",
    "/Images/CA_04.jpg",
    "/Images/CA_05.jpg",
    "/Images/CA_06.jpg",
  ],
};

// Mapping de objetos a imagenes y titulos
const objectMappings = {
  "2BR_G_A": {
    image: "./FP_FAC/B_2BR_01_FP.png",
    title: "2 Bedrooms A Garden: 211.54 sqm",
    carouselImages: carouselImagesByKey["2BR_G_A"],
  },
  "2BR_N1_A": {
    image: "./FP_FAC/B_2BR_02_FP.png",
    title: "2 Bedrooms A L1: 211.54.00 sqm",
    carouselImages: carouselImagesByKey["2BR_N1_A"],
  },
  "2BR_N2_A": {
    image: "./FP_FAC/B_2BR_03_FP.png",
    title: "2 Bedrooms A L2: 211.54.00 sqm",
    carouselImages: carouselImagesByKey["2BR_N2_A"],
  },
  "3BR_G_A": {
    image: "./FP_FAC/B_3BR_01_FP.png",
    title: "3 Bedrooms A Garden: 215.71 sqm",
    carouselImages: carouselImagesByKey["3BR_G_A"],
  },
  "3BR_N1_A": {
    image: "./FP_FAC/B_3BR_02_FP.png",
    title: "3 Bedrooms A L1: 215.71 sqm",
    carouselImages: carouselImagesByKey["3BR_N1_A"],
  },
  "3BR_N2_A": {
    image: "./FP_FAC/B_3BR_03_FP.png",
    title: "3 Bedrooms A L2: 215.71 sqm",
    carouselImages: carouselImagesByKey["3BR_N2_A"],
  },
  "4BR_A": {
    image: "./FP_FAC/B_4BR_04_FP01.png",
    title: "4 Bedrooms A: 428.86 sqm",
    carouselImages: carouselImagesByKey["4BR_A"],
  },

  "2BR_G_B": {
    image: "./FP_FAC/A_2BR_01_FP.png",
    title: "2 Bedrooms B Garden: 211.54 sqm",
    carouselImages: carouselImagesByKey["2BR_G_B"],
  },
  "2BR_N1_B": {
    image: "./FP_FAC/A_2BR_02_FP.png",
    title: "2 Bedrooms B L1: 211.54.00 sqm",
    carouselImages: carouselImagesByKey["2BR_N1_B"],
  },
  "2BR_N2_B": {
    image: "./FP_FAC/A_2BR_03_FP.png",
    title: "2 Bedrooms B L2: 211.54.00 sqm",
    carouselImages: carouselImagesByKey["2BR_N2_B"],
  },
  "3BR_G_B": {
    image: "./FP_FAC/A_3BR_01_FP.png",
    title: "3 Bedrooms B Garden: 215.71 sqm",
    carouselImages: carouselImagesByKey["3BR_G_B"],
  },
  "3BR_N1_B": {
    image: "./FP_FAC/A_3BR_02_FP.png",
    title: "3 Bedrooms B L1: 215.71 sqm",
    carouselImages: carouselImagesByKey["3BR_N1_B"],
  },
  "3BR_N2_B": {
    image: "./FP_FAC/A_3BR_03_FP.png",
    title: "3 Bedrooms B L2: 215.71 sqm",
    carouselImages: carouselImagesByKey["3BR_N2_B"],
  },
  "4BR_B": {
    image: "./FP_FAC/A_4BR_04_FP01.png",
    title: "4 Bedrooms B: 428.86 sqm",
    carouselImages: carouselImagesByKey["4BR_B"],
  },

  CA_01: {
    image: "./FP_FAC/CA_01_FP.png",
    title: "The Casita A1: 380.95 sqm",
    carouselImages: carouselImagesByKey["CA_01"],
  },
};

export const floatingPanelActive = atom(false);
export const modalPanelActive = atom(false);

const Overlay = () => {
  const [showFloatingPanel, setShowFloatingPanel] = useState(false);
  const [showModalPanel, setShowModalPanel] = useState(false);
  const [panelImage, setPanelImage] = useState("/logotipo.png");
  const [panelTitle, setPanelTitle] = useState("Informacion del proyecto");
  const [panelDescription, setPanelDescription] = useState("");
  const [tourButtonEnabled, setTourButtonEnabled] = useState(false);
  const [currentTourKey, setCurrentTourKey] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const [isFloatingPanelActive, setIsFloatingPanelActive] =
    useAtom(floatingPanelActive);
  const [isModalPanelActive, setIsModalPanelActive] = useAtom(modalPanelActive);
  const [isMobile] = useAtom(isMobileAtom);

  useEffect(() => {
    const openPanel = (
      image,
      annotation,
      description = "",
      enableTour = false,
      tourKey = null,
    ) => {
      setPanelImage(`/${image}`);
      setPanelTitle(annotation);
      setPanelDescription(description);
      setTourButtonEnabled(enableTour);
      setCurrentTourKey(tourKey);
      setShowFloatingPanel(true);
      setIsFloatingPanelActive(true);
    };

    const handleAnnotationClick = (event) => {
      const { image, annotation, description, section } = event.detail;
      const tourKey = section === "casita" ? "CA_01" : null;
      openPanel(
        image,
        annotation,
        description ?? "",
        section === "casita",
        tourKey,
      );
    };

    const handleMeshClick = (event) => {
      const { image, annotation, description, meshName } = event.detail;
      openPanel(image, annotation, description ?? "", true, meshName ?? null);
    };

    window.addEventListener("annotation-click", handleAnnotationClick);
    window.addEventListener("mesh-click", handleMeshClick);

    return () => {
      window.removeEventListener("annotation-click", handleAnnotationClick);
      window.removeEventListener("mesh-click", handleMeshClick);
    };
  }, [setIsFloatingPanelActive]);

  useEffect(() => {
    if (showModalPanel) setCarouselIndex(0);
  }, [showModalPanel]);

  //Listen for return from 360 tour
  // useEffect(() => {
  //     const handleReturnFrom360 = (event) => {
  //         const { meshName } = event.detail

  //         if (meshName === 'CA_01' && lastPanelState) {
  //             setCameraMode(CameraModes.CASITA)
  //             setTipologyResidencias(lastPanelState.tipologies || [])
  //             setPanelImage(`/${lastPanelState.image}`)
  //             setPanelTitle(lastPanelState.title)
  //             setCurrentMeshName(lastPanelState.meshName)
  //             setShowFloatingPanel(true)
  //             setIsFloatingPanelActive(true)
  //             return
  //         }

  //         // Set camera mode to RESIDENCES
  //         setCameraMode(CameraModes.RESIDENCES)

  //         // Activate the tipology for the returned mesh
  //         setTipologyResidencias([meshName])

  //         const mapping = objectMappings[meshName]
  //         if (mapping) {
  //             setPanelImage(`/${mapping.image}`)
  //             setPanelTitle(mapping.title)
  //             setCurrentMeshName(meshName)
  //             setShowFloatingPanel(true)
  //             setIsFloatingPanelActive(true)
  //         }
  //     }

  //     window.addEventListener('return-from-360', handleReturnFrom360)

  //     return () => {
  //         window.removeEventListener('return-from-360', handleReturnFrom360)
  //     }

  // }, [lastPanelState, setCameraMode, setIsFloatingPanelActive, setTipologyResidencias])

  const closeFloatingPanel = () => {
    setShowFloatingPanel(false);
    setPanelImage("/logotipo.png");
    setPanelTitle("Informacion del proyecto");
    setTourButtonEnabled(false);
    setCurrentTourKey(null);
    setIsFloatingPanelActive(false);
  };

  const openModalPanel = (e) => {
    e.stopPropagation(); // Prevenir que se cierre el floating panel
    setShowModalPanel(true);

    setIsModalPanelActive(true);
  };

  const closeModalPanel = () => {
    setShowModalPanel(false);

    setIsModalPanelActive(false);
  };

  return (
    <>
      {/* Logotipo del desarrollo */}
      {/* <div className="logo-container">
        <div className="logo-main">
          <img src="/Soho_Logo.png" alt="Soho Logo" />
        </div>
        <img src="/logotipo.png" alt="Logo" className="soho-logo" />
      </div> */}

      {/* <div
        className={`absolute z-10 ${isMobile ? "top-4 left-4" : "top-[50px] left-[50px]"}`}
      >
        <img
          src="/Soho_Logo.png"
          alt="Soho Logo"
          className={isMobile ? "w-16 h-auto" : "w-[100px] h-auto"}
        />
      </div> */}

      {/* ------------------------ */}
      {/* Navigation Words */}
      {/* <div
        style={{
          position: "absolute",
          top: "80px",
          right: "20px",
          display: "flex",
          flexDirection: "row",
          gap: "120px",
          zIndex: 10,
          transform: "translateX(-50px)",
        }}
      >
        <a
          href="https://sordomadaleno.com/projects"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "25px",
            color: "#FFFEF7",
            fontWeight: "500",
            textDecoration: "none",
            cursor: "pointer",
            transition: "opacity 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.opacity = "0.7")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          PROJECTS
        </a>

        <a
          href="http://sordomadaleno.com/studio"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "25px",
            color: "#FFFEF7",
            fontWeight: "500",
            textDecoration: "none",
            cursor: "pointer",
            transition: "opacity 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.opacity = "0.7")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          STUDIO
        </a>

        <span
          style={{
            fontSize: "25px",
            color: "#FFFEF7",
            fontWeight: "500",
            cursor: "pointer",
          }}
          onMouseOver={(e) => (e.target.style.opacity = "0.7")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          TEAM
        </span>

        <span
          style={{
            fontSize: "25px",
            color: "#FFFEF7",
            fontWeight: "500",
            cursor: "pointer",
          }}
          onMouseOver={(e) => (e.target.style.opacity = "0.7")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          HOME
        </span>
      </div> */}

      {/* ---------------- */}
      {/*Floating Panel */}
      {/* {showFloatingPanel && (
        <div className="floating-panel">
          <button className="floating-panel-close" onClick={closeFloatingPanel}>
            x
          </button>
          <div className="floating-panel-content">
            <img
              src={panelImage}
              alt={panelTitle}
              className="floating-panel-image"
              onClick={openModalPanel}
              style={{ cursor: "pointer" }}
            />
            <h3 className="floating-panel-title">{panelTitle}</h3>
            <Button
              variant="outline"
              onClick={
                objectMappings[currentMeshName]
                  ? () => onTourClick(currentMeshName)
                  : null
              }
              disabled={!objectMappings[currentMeshName]}
              style={{
                width: "150px",
                marginTop: "10px",
                color: "#FFFEF7",
                borderColor: "rgba(255,254,247,0.5)",
                backgroundColor: objectMappings[currentMeshName]
                  ? "rgba(255,254,247,0.5)"
                  : "rgba(128,128,128,0.3)",
                opacity: objectMappings[currentMeshName] ? 1 : 0.5,
                cursor: objectMappings[currentMeshName]
                  ? "pointer"
                  : "not-allowed",
                "&:hover": {
                  backgroundColor: objectMappings[currentMeshName]
                    ? "rgba(255,254,247,0.6)"
                    : "rgba(128,128,128,0.3)",
                },
              }}
            >
              TOUR
            </Button>
          </div>
        </div>
      )} */}

      {createPortal(
        <AnimatePresence>
          {showFloatingPanel && (
            <>
              {/* Overlay de fondo - por encima de UI */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[99998]"
                onClick={closeFloatingPanel}
              />

              {/* Panel deslizable desde la derecha */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 200,
                }}
                className={`fixed top-0 right-0 h-full w-full ${
                  isMobile ? "" : "max-w-[672px]"
                } bg-[#C6C1AE] backdrop-blur-md shadow-2xl z-[100000] flex flex-col`}
                style={{ fontFamily: "OT PIETRO PRO" }}
              >
                {/* Botón de cerrar */}
                <button
                  onClick={closeFloatingPanel}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-2xl font-light text-[#FFFEF7] hover:bg-white/20 rounded-full transition-colors duration-200 z-10"
                >
                  ×
                </button>

                {/* Contenido del panel */}
                <div
                  className="flex flex-col items-center justify-start p-8 pt-16 h-full overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Imagen centrada */}
                  <motion.img
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    whileHover={{ scale: 1.03, transition: { duration: 0.05 } }}
                    src={panelImage}
                    alt={panelTitle}
                    onClick={openModalPanel}
                    className="w-full max-w-[576px] h-auto rounded-lg shadow-lg cursor-pointer mx-auto mt-[25px]"
                  />

                  {/* Título centrado horizontalmente con la imagen, 50px abajo */}
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="text-[#FFFEF7] text-xl font-medium text-center mt-[50px] px-4"
                  >
                    {panelTitle}
                  </motion.h3>

                  {/* Sección Description con lorem ipsum */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    className="mt-6 px-4 w-full"
                  >
                    {/* <h4 className="text-[#FFFEF7] text-lg font-semibold mb-3 text-center">
                      Description
                    </h4> */}
                    <p className="text-[rgba(255,254,247,0.8)] text-base leading-relaxed text-center whitespace-pre-line">
                      {panelDescription || ""}
                    </p>

                    {tourButtonEnabled && (
                      <div className="flex justify-center mt-6">
                        <motion.button
                          type="button"
                          className={`text-sm bg-transparent hover:bg-[#C6C1AE] font-semibold text-[#FFFEF7] hover:text-[#2E3641] border-2 border-[#FFFEF7] transition-colors duration-500 px-4 py-1 rounded-lg uppercase w-auto ${isMobile ? "origin-top scale-y-[0.75]" : ""}`}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            closeFloatingPanel();
                            window.dispatchEvent(
                              new CustomEvent("tour-button-click", {
                                detail: { returnToMesh: currentTourKey },
                              }),
                            );
                          }}
                        >
                          TOUR
                        </motion.button>
                      </div>
                    )}
                  </motion.div>

                  {/* <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <Button
                    variant="outline"
                    onClick={
                      objectMappings[currentMeshName]
                        ? () => onTourClick(currentMeshName)
                        : null
                    }
                    disabled={!objectMappings[currentMeshName]}
                    className={`w-[150px] mt-2.5 ${
                      objectMappings[currentMeshName]
                        ? "bg-[rgba(255,254,247,0.5)] text-[#FFFEF7] border-[rgba(255,254,247,0.5)] hover:bg-[rgba(255,254,247,0.6)] cursor-pointer"
                        : "bg-[rgba(128,128,128,0.3)] text-[#FFFEF7] border-[rgba(255,254,247,0.5)] opacity-50 cursor-not-allowed"
                    }`}
                  >
                    TOUR
                  </Button>
                </motion.div> */}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}

      {/* ----------------------- */}
      {/* Modal Panel */}
      {/* {showModalPanel && (
            <div className="modal-overlay" onClick={closeModalPanel}>
                <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-panel-close" onClick={closeModalPanel}>x</button>
                    <div className="modal-panel-content">
                        <img src={panelImage} alt={panelTitle} className="modal-panel-image" />
                        <h3 className="modal-panel-title">{panelTitle}</h3>
                    </div>
                </div>
            </div>
        )} */}

      {createPortal(
        <AnimatePresence>
          {showModalPanel && (
            <>
              {/* Overlay de fondo - por encima del floating panel */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100001]"
                onClick={closeModalPanel}
              />

              {/* Modal Panel centrado - por encima del floating panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 200,
                }}
                style={{
                  position: "fixed",
                  top: isMobile ? "2.5%" : "10%",
                  left: isMobile ? "2.5%" : "10%",
                  width: isMobile ? "95vw" : "80vw",
                  height: isMobile ? "95vh" : "80vh",
                  zIndex: 100002,
                  fontFamily: "OT PIETRO PRO",
                }}
                className="bg-[#C6C1AE] backdrop-blur-md shadow-2xl flex flex-col rounded-[20px] border-2 border-[rgba(255,254,247,0.8)]"
              >
                {/* Botón de cerrar */}
                <button
                  onClick={closeModalPanel}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-2xl font-light text-[#FFFEF7] hover:bg-white/20 rounded-full transition-colors duration-200 z-10"
                >
                  ×
                </button>

                {/* Contenido del modal - carousel de imágenes y título */}
                <div className="flex flex-col items-center justify-center h-full p-8">
                  {/* Carousel de imágenes */}
                  {(() => {
                    const mapping = currentTourKey
                      ? objectMappings[currentTourKey]
                      : null;
                    const carouselImages = mapping?.carouselImages?.length
                      ? mapping.carouselImages.map((p) =>
                          p.startsWith("/") ? p : `/${p}`,
                        )
                      : [panelImage];
                    const hasMultiple = carouselImages.length > 1;

                    return (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                        className="w-[80%] max-h-[64vh] aspect-video rounded-lg overflow-hidden shadow-lg relative"
                      >
                        <img
                          key={carouselIndex}
                          src={carouselImages[carouselIndex]}
                          alt={`${panelTitle} ${carouselIndex + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />

                        {hasMultiple && (
                          <>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCarouselIndex((i) =>
                                  i <= 0 ? carouselImages.length - 1 : i - 1,
                                );
                              }}
                              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#C6C1AE]/50 text-[#2E3641] flex items-center justify-center text-xl leading-none hover:bg-[#C6C1AE]/80 transition-colors"
                              aria-label="Anterior"
                            >
                              ‹
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCarouselIndex((i) =>
                                  i >= carouselImages.length - 1 ? 0 : i + 1,
                                );
                              }}
                              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#C6C1AE]/50 text-[#2E3641] flex items-center justify-center text-xl leading-none hover:bg-[#C6C1AE]/80 transition-colors"
                              aria-label="Siguiente"
                            >
                              ›
                            </button>
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                              {carouselImages.map((_, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCarouselIndex(idx);
                                  }}
                                  className={`w-2 h-2 rounded-full transition-colors ${
                                    idx === carouselIndex
                                      ? "bg-[#FFFEF7]"
                                      : "bg-[#FFFEF7]/50"
                                  }`}
                                  aria-label={`Ir a imagen ${idx + 1}`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </motion.div>
                    );
                  })()}

                  {/* Título centrado debajo del carousel */}
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="text-[#FFFEF7] text-2xl font-medium text-center mt-6 px-4"
                  >
                    {panelTitle}
                  </motion.h3>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
};

export default Overlay;
