# Music10 Server ![Server](https://github.com/dergunovd/music10/workflows/Server/badge.svg)

### Description

TODO

### NPM-scripts

- _prebuild_ - clear old build artifacts
- _build_ - build application
- _format_ - format sources
- _start_ - run application
- _start:dev_ - Run application with --watch
- _start:debug_ - Run application with debug tools
- _start:prod_ - Run application using production params
- _start:forever_ - Run application using _forever_
- _lint_ - Lint source using eslint
- _test_ - Run unit tests using Jest
- _test:watch_ - Run unit tests using Jest with --watch
- _test:cov_ - Run unit tests using Jest with coverage
- _test:debug_ - Run unit tests using Jest with debug tools
- _test:e2e_ - Run e2e tests
- _doc_ - Generate documentation using compodoc
- _deploy:doc_ - Deploy documentation
- _deploy:coverage_ - Deploy test-coverage result

### Local run

`npm install`

`npm start`

### Deploy

`sudo docker build -t music . && sudo docker run -p 5001:3001 -p 5000:3000 -d --name music music`

## WebSocket API
# Music10 API 1.0.0 documentation

WebSocket Music10 API
## Table of Contents

* [Servers](#servers)
* [Channels](#channels)

<a name="servers"></a>

## Servers

<table>
  <thead>
    <tr>
      <th>URL</th>
      <th>Protocol</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <td>ws.api.music.dergunov.net</td>
      <td>wss</td>
      <td></td>
    </tr>
    <tr>
      <td colspan="3">
        <details>
          <summary>URL Variables</summary>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Default value</th>
                <th>Possible values</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              </tbody>
          </table>
        </details>
      </td>
    </tr>
    </tbody>
</table>




## Channels



<a name="channel-game/setPlaylist"></a>


#### Channel Parameters




###  `subscribe` game/setPlaylist



#### Message




##### Payload


<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>

<tr>
  <td>Message Payload </td>
  <td>integer</td>
  <td><p>Playlist id for game</p>
 </td>
  <td><em>Any</em></td>
</tr>
    </tbody>
</table>


###### Example of payload _(generated)_

```json
""
```





<a name="channel-game/playlist"></a>


#### Channel Parameters




###  `publish` game/playlist



#### Message




##### Payload


<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>

<tr>
  <td>id </td>
  <td>integer</td>
  <td> </td>
  <td><em>Any</em></td>
</tr>

<tr>
  <td>name </td>
  <td>string</td>
  <td> </td>
  <td><em>Any</em></td>
</tr></tbody>
</table>


###### Example of payload _(generated)_

```json
{
  "id": 1,
  "name": "Русский рэп"
}
```





<a name="channel-game/next"></a>


#### Channel Parameters




###  `subscribe` game/next



#### Message




##### Payload


<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>

<tr>
  <td>Message Payload </td>
  <td>object</td>
  <td> </td>
  <td><em>Any</em></td>
</tr>
    </tbody>
</table>


###### Example of payload _(generated)_

```json
{}
```





<a name="channel-game/nextTracks"></a>


#### Channel Parameters




###  `publish` game/nextTracks



#### Message




##### Payload


<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>

<tr>
  <td>tracks </td>
  <td>array(object)</td>
  <td><p>Array with displayed files</p>
 </td>
  <td><em>Any</em></td>
</tr>


<tr>
  <td>tracks.id </td>
  <td>integer</td>
  <td> </td>
  <td><em>Any</em></td>
</tr>


<tr>
  <td>tracks.author </td>
  <td>string</td>
  <td> </td>
  <td><em>Any</em></td>
</tr>


<tr>
  <td>tracks.name </td>
  <td>string</td>
  <td> </td>
  <td><em>Any</em></td>
</tr>

<tr>
  <td>mp3 </td>
  <td>string</td>
  <td><p>URL of mp3 file</p>
 </td>
  <td><em>Any</em></td>
</tr></tbody>
</table>


###### Example of payload _(generated)_

```json
{
  "tracks": [
    {
      "id": 0,
      "author": "string",
      "name": "string"
    },
    {
      "id": 0,
      "author": "string",
      "name": "string"
    },
    {
      "id": 0,
      "author": "string",
      "name": "string"
    },
    {
      "id": 0,
      "author": "string",
      "name": "string"
    }
  ],
  "mp3": "string"
}
```





<a name="channel-game/choose"></a>


#### Channel Parameters




###  `subscribe` game/choose



#### Message




##### Payload


<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>

<tr>
  <td>Message Payload </td>
  <td>integer</td>
  <td><p>Playlist id of user choose</p>
 </td>
  <td><em>Any</em></td>
</tr>
    </tbody>
</table>


###### Example of payload _(generated)_

```json
""
```





<a name="channel-game/chooseResult"></a>


#### Channel Parameters




###  `publish` game/chooseResult



#### Message




##### Payload


<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>

<tr>
  <td>correct </td>
  <td>integer</td>
  <td><p>Right Track ID</p>
 </td>
  <td><em>Any</em></td>
</tr>

<tr>
  <td>result </td>
  <td>object</td>
  <td> </td>
  <td><em>Any</em></td>
</tr>



<tr>
  <td>result.progress </td>
  <td>array(boolean)</td>
  <td><p>Boolean array of game progress</p>
 </td>
  <td><em>Any</em></td>
</tr>



<tr>
  <td>result.isEnd </td>
  <td>boolean</td>
  <td><p>Game ending flag</p>
 </td>
  <td><em>Any</em></td>
</tr></tbody>
</table>


###### Example of payload _(generated)_

```json
{
  "correct": 0,
  "result": {
    "progress": [
      true
    ],
    "isEnd": true
  }
}
```