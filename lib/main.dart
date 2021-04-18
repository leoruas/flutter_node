import 'package:flutter/material.dart';
import 'package:socket_io_client/socket_io_client.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart' as DotEnv;
import 'package:flutter_dotenv/flutter_dotenv.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  // This widget is the root of your application.
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
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

      socket.on('connect', (_) => print('Connect to socket with id: ${socket.id}'));
      setState(() {
        hasConnected = true;  
      });
    } catch (e) {
      print(e.toString());
    }
  }
}
