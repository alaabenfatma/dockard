import React from 'react'

export default function About() {
  return (
    <div style={{
      alignItems: 'left',
      position: 'absolute',
      top: '68px',

    }}>
      <h1
        style={{
          textAlign: 'left',
          marginBottom: '-0.75rem'
        }}>
        <span>
          <img src="favicon.ico" alt="Dockard Logo" width="50" height="50" style={{
            marginBottom: '-1rem',
          }} />
          <br />
          Dockard
        </span>
      </h1>
      <h3 style={{
        width: '50%',
        textAlign: 'left',
        marginBottom: '-1rem',
      }}>
        Description
      </h3>
      <p style={{
        width: '50%',
        textAlign: 'left',
        textJustify: 'auto'
      }}>
        Dockard is a tool that helps you to create a diagram from a docker-compose file written in YAML.
        The generated diagram is a visual representation of the different services and their dependencies
        in your docker-compose file.
        <br />
        Dockard can be used in a scenario where you want to illustrate the architecture of your application, and the flow of dependencies between the different services.
      </p>
      <h3 style={{
        width: '50%',
        textAlign: 'left',
        marginBottom: '-1rem',
      }}>
        Privacy
      </h3>
      <p style={{
        width: '50%',
        textAlign: 'left',
        textJustify: 'auto',
      }}>
        Dockard is 100% client-side and does not collect any data. All the rendering is done in your browser.
        Users who value their privacy can use this tool without any worries.
        <br />
        This tool can be used offline and does not require any internet connection (except for the images).
      </p>
      <h3 style={{
        width: '50%',
        textAlign: 'left',
        marginBottom: '-1rem',
      }}>
        Credits
      </h3>
      <p style={{
        width: '50%',
        textAlign: 'left',
        textJustify: 'auto',
      }}>
        The application is hosted on <a href="https://vercel.com/">Vercel</a> and uses <a href="https://icons8.com/">Icons8</a> for the icons.
      </p>
      <h3 style={{
        width: '50%',
        textAlign: 'left',
        marginBottom: '-1rem',
      }}>
        License
      </h3>
      <p style={{
        width: '50%',
        textAlign: 'left',
        textJustify: 'auto',
      }}>
        The project is licensed under the Apache License 2.0. You can find the source code on <a href="https://github.com/alaabenfatma/dockard">Dockard</a>.
      </p>


    </div>
  )
}
