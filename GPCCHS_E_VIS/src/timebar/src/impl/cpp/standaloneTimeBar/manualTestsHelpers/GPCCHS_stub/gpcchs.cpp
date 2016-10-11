#include <zmq.h>
#include <string.h>
#include <stdio.h>
#include <iostream>
#include <fstream>

int main(int argc, char *argv[])
{
void* context = zmq_ctx_new();
char sendMsg[5000];
int sendMsgLen = 0;
char rcvMsg[5000];
int rcvMsgLen = 0;
char timeBarUri[200];
char gpcchsUri[200];
int ret_val=0;
int msgCnt=0;
std::ifstream infile;
bool initSuccess = true;
void* socketPull = zmq_socket(context, ZMQ_PULL);
void* socketPush = zmq_socket(context, ZMQ_PUSH);

if(socketPull == 0) {
  std::cout << "Socket PULL creation failed" << std::endl;
}
if(socketPush == 0) {
  std::cout << "Socket PUSH creation failed" << std::endl;
}

if(argc>2) {
  ret_val = sprintf(timeBarUri,"tcp://127.0.0.1:%s",argv[1]);
  if( (ret_val>21) || (ret_val<17) ) initSuccess = false;
  ret_val = sprintf(gpcchsUri,"tcp://127.0.0.1:%s",argv[2]);
  if( (ret_val>21) || (ret_val<17) ) initSuccess = false;
} else {
  std::cout << "Two ports numbers for timeBar and GPCCHS not given as parameter" << std::endl;
  initSuccess = false;
}

infile.open ("jsonConf.txt");

if( infile.is_open() )
{
  infile.read(sendMsg,5000);
  sendMsgLen = infile.gcount();
  if (sendMsgLen < 5000) {
    sendMsg[sendMsgLen] = 0;
  } else {
    std::cout << "Incorrect lenght of the json to send : " << sendMsgLen << std::endl;
    initSuccess = false;    
  }
  infile.close();
} else {
  std::cout << "Json content file opening failed" << std::endl;
  initSuccess = false;
}

if(initSuccess) {
  std::cout << "Binding GPCCHS server on uri " << gpcchsUri << std::endl;
  ret_val = zmq_bind(socketPush, gpcchsUri);
  if(ret_val != -1) {
    std::cout << "Binding successful, send workspace to timeBar..." << std::endl;
    ret_val = zmq_send(socketPush,sendMsg,sendMsgLen,0);
    if(ret_val == sendMsgLen) {
      std::cout << "Workspace message sucessfully sent to timeBar on uri:" <<  gpcchsUri << std::endl;
    } else {
      std::cout << "Message sending failed to uri: " << gpcchsUri << ", return value is " << ret_val << " when nb bytes to send is: " << sendMsgLen << " and error string:" << zmq_strerror(ret_val) << std::endl;
    }
  } else {
    std::cout << "Binding failed on uri:" << timeBarUri << ", returned value is " << ret_val << " and error: " << zmq_strerror(ret_val) << std::endl;
  }
  ret_val = zmq_close(socketPush);
  if(ret_val == 0) {
    std::cout << "GPCCHS server successfully closed" << std::endl;
  } else {
    std::cout << "GPCCHS server closing failed, returned value is " << ret_val << " and error: " << zmq_strerror(ret_val) << std::endl;
  }


  std::cout << "Connecting to timeBar server uri: " << timeBarUri << std::endl;
  ret_val = zmq_connect(socketPull, timeBarUri);
  if(ret_val == 0) {
    std::cout << "Connection successful to timeBar" << std::endl;
    msgCnt = 0;
    while(1) {
      std::cout << "Wait for timeBar Json message " << msgCnt << "..." << std::endl;
      rcvMsgLen = zmq_recv(socketPull,rcvMsg,5000,0);
      if(rcvMsgLen >= 0) {
          std::cout << "\rReceived message size is: " << rcvMsgLen << std::endl;
          rcvMsg[rcvMsgLen]=0;
          std::cout << "Message is : " << rcvMsg << std::endl;
      } else {
        std::cout << "Message reception failed, returned value is " << rcvMsgLen << " and error: " << zmq_strerror(rcvMsgLen) << std::endl;
      }
      msgCnt++;
    }
  } else {
    std::cout << "Connection to timeBar failed on uri:" << timeBarUri << ", returned value is " << ret_val << " and error: " << zmq_strerror(ret_val) << std::endl;
  }
}
return 0;
}
