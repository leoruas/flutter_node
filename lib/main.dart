import 'package:flutter/material.dart';
import 'package:flutter_node/screens/Controller.dart';
import 'package:flutter_node/screens/Home.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Login App',
      initialRoute: '/',
      routes: {
        '/': (context) => Home(),
        '/controller': (context) => Controller(),
      },
    );
  }
}