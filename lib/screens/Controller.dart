import 'package:flutter/material.dart';
import 'package:socket_io_client/socket_io_client.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart' as DotEnv;
import 'package:flutter_dotenv/flutter_dotenv.dart';

class Controller extends StatefulWidget {
  @override
  _ControllerState createState() => _ControllerState();
}

class _ControllerState extends State<Controller> {
  Socket socket;
  String ip;

  @override
  void initState() {
    super.initState();
    connectToServer();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                IconButton(
                    icon: Icon(Icons.arrow_upward),
                    onPressed: () {
                      socket.emit("update-player", "up");
                    }),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                IconButton(
                    icon: Icon(Icons.arrow_back),
                    onPressed: () {
                      socket.emit("update-player", "left");
                    }),
                IconButton(
                    icon: Icon(Icons.arrow_forward),
                    onPressed: () {
                      socket.emit("update-player", "right");
                    }),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                IconButton(
                    icon: Icon(Icons.arrow_downward),
                    onPressed: () {
                      socket.emit("update-player", "down");
                    }),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void connectToServer() async {
    await DotEnv.load(fileName: ".env"); //get env file
    try {
      ip = env['SERVER_IP']; //get ip from .env file

      // Configure socket to connect with server ip
      socket = io('http://$ip:8028', <String, dynamic>{
        'transports': ['websocket'],
        'autoConnect': false,
      });

      socket.connect();

      socket.on(
          'connect', (_) => print('Connect to socket with id: ${socket.id}'));
    } catch (e) {
      print(e.toString());
    }
  }
}
