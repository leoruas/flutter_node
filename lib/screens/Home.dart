import 'package:flutter/material.dart';
import 'package:socket_io_client/socket_io_client.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart' as DotEnv;
import 'package:flutter_dotenv/flutter_dotenv.dart';

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  Socket socket;
  String ip;
  bool hasConnected = false;

  @override
  void initState() {
    super.initState();
    connectToServer();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Flutter Node App",
      home: Scaffold(
        body: Center(
          child: RaisedButton(
            onPressed: hasConnected
                ? () {
                    socket.emit("open-game");
                    Navigator.of(context)
                        .pushNamed("/controller"); //open controller
                  }
                : null,
            child: Text("Open Game"),
          ),
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
      setState(() {
        hasConnected = true;
      });
    } catch (e) {
      print(e.toString());
    }
  }
}
