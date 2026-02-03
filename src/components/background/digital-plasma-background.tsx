"use client"

import { useEffect, useRef } from "react"

export function DigitalPlasmaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl")
    if (!gl) return

    // Vertex Shader (simple, solo pasa las coordenadas)
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    // Fragment Shader (aquí ocurre la magia de los colores)
    const fragmentShaderSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        
        // Coordenadas centradas y ajustadas
        vec2 p = uv * 2.0 - 1.0;
        p.x *= u_resolution.x / u_resolution.y;
        
        // Animación de ondas usando seno y coseno
        float t = u_time * 0.3; // Velocidad
        
        float r = sin(p.x * 0.6 + t) + sin(p.y * 0.8 + t * 1.2) + sin((p.x + p.y) * 0.5 + t * 0.7);
        float g = sin(p.x * 0.7 + t * 1.1) + sin(p.y * 0.5 + t * 1.3) + sin((p.x - p.y) * 0.6 + t * 0.8);
        float b = sin(p.x * 0.5 + t * 1.2) + sin(p.y * 0.7 + t * 0.9) + sin((p.x + p.y * 1.5) * 0.4 + t * 0.6);

        // Mapear los valores de -3 a 3 a un rango de color de 0 a 1
        vec3 color = vec3(r, g, b) * 0.5 + 0.5;
        
        // Ajustar la paleta de colores a Cyan/Purple/Blue
        color.r = color.r * 0.2 + 0.1; // Menos rojo, más hacia el morado oscuro
        color.g = color.g * 0.6 + 0.2; // Cyan/Verde azulado
        color.b = color.b * 0.8 + 0.4; // Azul predominante

        // Oscurecer y añadir contraste para el fondo
        color = pow(color, vec3(3.0)); // Aumentar contraste
        color *= 0.25; // Reducir brillo general

        gl_FragColor = vec4(color, 1.0);
      }
    `

    // Compilar shaders
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource)
    if (!vertexShader || !fragmentShader) return

    // Crear programa
    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
      return
    }
    gl.useProgram(program)

    // Crear buffer para un cuadrado que cubra la pantalla
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), // Dos triángulos que forman un cuadrado
      gl.STATIC_DRAW
    )

    const positionAttributeLocation = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(positionAttributeLocation)
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

    // Uniforms para tiempo y resolución
    const timeUniformLocation = gl.getUniformLocation(program, "u_time")
    const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution")

    let animationFrameId: number
    const startTime = performance.now()

    const render = (currentTime: number) => {
      const elapsedTime = (currentTime - startTime) / 1000
      
      // Ajustar canvas al tamaño de la ventana
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        gl.viewport(0, 0, canvas.width, canvas.height)
      }

      gl.uniform1f(timeUniformLocation, elapsedTime)
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      animationFrameId = requestAnimationFrame(render)
    }

    render(startTime)

    return () => {
      cancelAnimationFrame(animationFrameId)
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Canvas con el Shader */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      {/* Capa de Vignette y Ruido para darle textura y profundidad */}
      <div 
        className="absolute inset-0 z-10 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_10%,#000_100%)] opacity-70" />
    </div>
  )
}