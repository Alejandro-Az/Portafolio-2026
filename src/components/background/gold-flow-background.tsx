"use client"

import { useEffect, useRef } from "react"

export function GoldFlowBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const gl = canvas.getContext("webgl")
        if (!gl) return

        // Vertex Shader
        const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

        // Fragment Shader (Gold/Amber Liquid Effect)
        const fragmentShaderSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        
        // Coordenadas centradas y ajustadas
        vec2 p = uv * 2.0 - 1.0;
        p.x *= u_resolution.x / u_resolution.y;
        
        // Animación líquida
        float t = u_time * 0.2; // Lento y elegante
        
        float r = sin(p.x * 0.5 + t) + sin(p.y * 0.5 + t * 1.5) + sin((p.x + p.y) * 0.4 + t * 0.6);
        float g = sin(p.x * 0.6 + t * 1.2) + sin(p.y * 0.4 + t * 1.1) + sin((p.x - p.y) * 0.5 + t * 0.8);
        float b = sin(p.x * 0.4 + t * 1.3) + sin(p.y * 0.6 + t * 0.9) + sin((p.x + p.y * 1.2) * 0.3 + t * 0.5);

        // Mapear
        vec3 color = vec3(r, g, b) * 0.5 + 0.5;
        
        // Paleta DORADA (Golden/Amber)
        // Red: Alto (0.8 - 1.0)
        // Green: Medio (0.5 - 0.7) -> Mezcla amarillo/naranja
        // Blue: Bajo (0.0 - 0.2) -> Profundidad
        
        float intensity = (color.r + color.g + color.b) / 3.0;
        
        vec3 goldColor = vec3(1.0, 0.7, 0.1); // Oro base
        vec3 darkGold = vec3(0.5, 0.2, 0.0); // Cobre oscuro
        
        // Mezclar basado en el patrón de ondas
        color = mix(darkGold, goldColor, intensity);
        
        // Añadir destellos
        float shine = smoothstep(0.8, 0.95, intensity);
        color += shine * 0.5;

        // Oscurecer para fondo dramático
        color *= 0.4; 

        gl_FragColor = vec4(color, 1.0);
      }
    `

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

        const positionBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
            gl.STATIC_DRAW
        )

        const positionAttributeLocation = gl.getAttribLocation(program, "a_position")
        gl.enableVertexAttribArray(positionAttributeLocation)
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

        const timeUniformLocation = gl.getUniformLocation(program, "u_time")
        const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution")

        let animationFrameId: number
        const startTime = performance.now()

        const render = (currentTime: number) => {
            const elapsedTime = (currentTime - startTime) / 1000

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
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />
            {/* Noise Texture for realism */}
            <div
                className="absolute inset-0 z-10 opacity-20 mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
            {/* Vignette */}
            <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000_100%)] opacity-80" />
        </div>
    )
}
