import { useState, useEffect } from 'react'
import './App.css'

// URL del video de YouTube para relajación
const RELAXATION_VIDEO_URL = "https://youtu.be/nnjXKnsPOGs";

// Componente Modal para mostrar contenido en una ventana emergente
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-title">{title}</h2>
        {children}
      </div>
    </div>
  );
};

// Estilos inline para el fondo
const backgroundStyle = {
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/img/background2.avif")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed'
};

// Estilos para contenedores con fondo semitransparente
const containerStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  borderRadius: '15px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  backdropFilter: 'blur(5px)',
  padding: '1.5rem'
};

// Estilo para el contenedor inicial más transparente y con mayor difuminado
const initialContainerStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.65)', // Más transparente
  borderRadius: '15px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.25)',
  backdropFilter: 'blur(10px)', // Mayor difuminado
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  height: 'auto', // En lugar de una altura fija, que se ajuste al contenido
  minHeight: '50vh' // Altura mínima para asegurar buen espacio
};

// Estilos para el header
const headerStyle = {
  backgroundColor: 'rgba(168, 216, 234, 0.85)',
  borderBottom: '1px solid rgba(221, 221, 221, 0.5)',
  backdropFilter: 'blur(5px)'
};

// Estilos para el footer
const footerStyle = {
  backgroundColor: 'rgba(245, 245, 245, 0.85)',
  borderTop: '1px solid rgba(221, 221, 221, 0.5)',
  backdropFilter: 'blur(5px)'
};

// Estilos para el contenedor de la imagen y mensaje del gato
const catContainerStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  marginTop: '0.5rem', // Menos espacio superior
  width: '100%'
};

function App() {
  const [step, setStep] = useState('initial');
  const [emotion, setEmotion] = useState('');
  const [catImage, setCatImage] = useState('');
  const [catMessageVisible, setCatMessageVisible] = useState(false);
  const [catClicked, setCatClicked] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [developerLinkClicked, setDeveloperLinkClicked] = useState(false);
  const [showExitMessage, setShowExitMessage] = useState(false);

  // Función para seleccionar una imagen de gato al azar al cargar la app
  useEffect(() => {
    const sillyImages = ['silly1.webp', 'silly2.png', 'silly3.webp', 'silly4.webp', 'silly5.webp', 'silly7.png'];
    const randomIndex = Math.floor(Math.random() * sillyImages.length);
    setCatImage(`/img/sillys/${sillyImages[randomIndex]}`);
  }, []);

  // Función para manejar clic en la imagen del gato
  const handleCatClick = () => {
    if (!catClicked) {
      // Primer clic: mostrar mensaje
      setCatClicked(true);
      setCatMessageVisible(true);
    } else {
      // Segundo clic: abrir video de YouTube
      window.open(RELAXATION_VIDEO_URL, '_blank');
      // Resetear estado para futuras interacciones
      setCatClicked(false);
      setCatMessageVisible(false);
    }
  };

  // Función para manejar clic en el enlace del desarrollador
  const handleDeveloperLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (!developerLinkClicked) {
      // Primer clic: mostrar mensaje sobre Nadia Montecinos
      setDeveloperLinkClicked(true);
      setShowExitMessage(true);
      
      // Ocultar el mensaje después de 3 segundos
      setTimeout(() => {
        setShowExitMessage(false);
      }, 3000);
    } else {
      // Segundo clic: mostrar mensaje de salida y luego abrir el sitio
      setDeveloperLinkClicked(false); // Resetear el estado inmediatamente
      setShowExitMessage(true);
      
      // Mostrar mensaje de salida y luego abrir el sitio
      setTimeout(() => {
        // Abrir el enlace después de mostrar el mensaje
        window.open('https://sushimin.neocities.org/', '_blank');
        setShowExitMessage(false);
      }, 2000);
    }
  };

  return (
    <div className="app-container" style={backgroundStyle}>
      <header className="app-header" style={headerStyle}>
        <h1>¡AQUÍ ESTOY!</h1>
        <h2>Primeros Auxilios Psicológicos</h2>
      </header>

      {/* Enlace al desarrollador */}
      <a 
        href="https://sushimin.neocities.org/" 
        onClick={handleDeveloperLinkClick}
        className="developer-link" 
        title="Desarrollador"
      >
        ❓
      </a>
      
      {/* Mensaje de salida */}
      {showExitMessage && (
        <div className="exit-message">
          {developerLinkClicked ? 
            "Proyecto desarrollado para Nadia Montecinos" : 
            "Saliendo a la web del desarrollador..."}
        </div>
      )}

      <main className="app-content">
        {step === 'initial' && (
          <div className="initial-screen" style={initialContainerStyle}>
            <button 
              className="main-button round-button"
              onClick={() => setStep('emotion')}
            >
              Necesito apoyo ahora
            </button>
            <p className="supportive-message">Estás a salvo ahora. Estamos contigo.</p>
            
            {/* Imagen del gato con funcionalidad de clic */}
            {catImage && (
              <div style={catContainerStyle}>
                <img 
                  src={catImage} 
                  alt="Gato acompañante" 
                  className="cat-image"
                  onClick={handleCatClick}
                />
                <p className={`cat-message ${catMessageVisible ? 'visible' : ''}`}>
                  Si quieres relajarte con nosotros, haz click de nuevo.
                </p>
              </div>
            )}
          </div>
        )}

        {step === 'emotion' && (
          <div className="emotion-screen" style={containerStyle}>
            <h3>¿Cómo te sientes ahora?</h3>
            <div className="emotion-grid">
              <button className="emotion-button" onClick={() => { setEmotion('asustado'); setStep('support'); }}>
                😨 Asustado/a
              </button>
              <button className="emotion-button" onClick={() => { setEmotion('triste'); setStep('support'); }}>
                😢 Triste
              </button>
              <button className="emotion-button" onClick={() => { setEmotion('ansioso'); setStep('support'); }}>
                😰 Ansioso/a
              </button>
              <button className="emotion-button" onClick={() => { setEmotion('confundido'); setStep('support'); }}>
                😕 Confundido/a
              </button>
              <button className="emotion-button" onClick={() => { setEmotion('shock'); setStep('support'); }}>
                😶 En shock
              </button>
              <button className="emotion-button" onClick={() => { setEmotion('otro'); setStep('support'); }}>
                ❓ Otro
              </button>
            </div>
          </div>
        )}

        {step === 'support' && (
          <div className="support-screen" style={containerStyle}>
            <h3>Reconocemos tu sentir</h3>
            <p className="validation-message">
              {emotion === 'asustado' && "Es normal sentir miedo después de lo que has vivido. Estás a salvo ahora."}
              {emotion === 'triste' && "Es natural sentir tristeza por lo ocurrido. No estás solo/a en esto."}
              {emotion === 'ansioso' && "La ansiedad es una respuesta normal después de un evento traumático. Vamos paso a paso."}
              {emotion === 'confundido' && "Es comprensible sentirse confundido/a. Tomaremos las cosas con calma."}
              {emotion === 'shock' && "Estar en shock es una respuesta protectora. Tu cuerpo y mente están procesando lo ocurrido."}
              {emotion === 'otro' && "Sea lo que sientas, es válido. Estamos aquí para apoyarte."}
            </p>

            <div className="support-options">
              <h4>¿Qué te gustaría hacer ahora?</h4>
              <div className="options-grid">
                <button className="option-button" onClick={() => setStep('breathing')}>
                  Ejercicio de respiración
                </button>
                <button className="option-button" onClick={() => setStep('grounding')}>
                  Técnica de anclaje
                </button>
                <button className="option-button" onClick={() => setStep('talk')}>
                  Hablar con alguien
                </button>
                <button className="option-button" onClick={() => setStep('resources')}>
                  Recursos de ayuda
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'breathing' && (
          <div className="breathing-screen" style={containerStyle}>
            <h3>Respiración guiada</h3>
            <div className="breathing-animation">
              <div className="breathing-circle"></div>
            </div>
            <p className="breathing-instruction">Respira conmigo. Inhala lentamente por 4 segundos, mantén por 2 segundos, exhala por 6 segundos.</p>
            <button className="return-button" onClick={() => setStep('support')}>Volver a opciones</button>
          </div>
        )}

        {step === 'grounding' && (
          <div className="grounding-screen" style={containerStyle}>
            <h3>Técnica de anclaje 5-4-3-2-1</h3>
            <div className="grounding-steps">
              <p>5 cosas que puedes <strong>VER</strong> a tu alrededor</p>
              <p>4 cosas que puedes <strong>TOCAR</strong></p>
              <p>3 cosas que puedes <strong>ESCUCHAR</strong></p>
              <p>2 cosas que puedes <strong>OLER</strong></p>
              <p>1 cosa que puedes <strong>SABOREAR</strong></p>
            </div>
            <p className="grounding-note">Esta técnica te ayuda a conectar con el presente y calmar tu sistema nervioso.</p>
            <button className="return-button" onClick={() => setStep('support')}>Volver a opciones</button>
          </div>
        )}

        {step === 'talk' && (
          <div className="talk-screen" style={containerStyle}>
            <h3>Hablar con alguien</h3>
            <div className="talk-options">
              <div className="talk-option">
                <h4>Línea de apoyo emocional</h4>
                <p>Disponible 24/7 para escucharte y brindarte apoyo:</p>
                <div className="phone-number">*4141</div>
                <a href="tel:*4141" className="phone-button">Llamar ahora</a>
              </div>
              <div className="talk-option">
                <h4>Chat con voluntario</h4>
                <button className="chat-button">Iniciar chat</button>
              </div>
            </div>
            <button className="return-button" onClick={() => setStep('support')}>Volver a opciones</button>
          </div>
        )}

        {step === 'resources' && (
          <div className="resources-screen" style={containerStyle}>
            <h3>Recursos de ayuda</h3>
            <div className="resources-list">
              <div className="resource-item">
                <h4>Centros de asistencia cercanos</h4>
                <button 
                  className="resource-button"
                  onClick={() => window.open('https://www.google.com/maps/search/centros+de+asistencia+psicologica/@-33.4444872,-70.67362,13.13z?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D', '_blank')}
                >
                  Ver ubicaciones
                </button>
              </div>
              <div className="resource-item">
                <h4>Guía de primeros auxilios psicológicos</h4>
                <p className="resource-description">
                  Manual ABCDE para la aplicación de Primeros Auxilios Psicológicos de la UC. Técnicas probadas de asistencia inmediata ante crisis emocionales.
                </p>
                <a 
                  href="https://medicina.uc.cl/wp-content/uploads/2018/08/Manual-ABCDE-para-la-aplicacion-de-Primeros-Auxilios-Psicologicos.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="resource-button pdf-button"
                >
                  Descargar PDF
                </a>
              </div>
              <div className="resource-item">
                <h4>Contactos de emergencia</h4>
                <button 
                  className="resource-button" 
                  onClick={() => setIsContactModalOpen(true)}
                >
                  Ver lista
                </button>
              </div>
            </div>
            <button className="return-button" onClick={() => setStep('support')}>Volver a opciones</button>
          </div>
        )}
      </main>

      <footer className="app-footer" style={footerStyle}>
        <button 
          className="home-button" 
          onClick={() => setStep('initial')}
        >
          Inicio
        </button>
      </footer>

      {/* Modal de Contactos de Emergencia */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Contactos de Emergencia"
      >
        <ul className="contact-list">
          <li className="contact-item">
            <div className="contact-name">Nadia Montecinos</div>
            <div className="contact-phone">+56 x xxx xxx</div>
          </li>
          {/* Puedes agregar más contactos aquí si es necesario */}
        </ul>
      </Modal>
    </div>
  )
}

export default App
