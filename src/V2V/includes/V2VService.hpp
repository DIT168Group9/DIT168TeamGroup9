#ifndef GROUP9_V2VSERVICE_HPP
#define GROUP9_V2VSERVICE_HPP

#include <iomanip>
#include <unistd.h>
#include <sys/time.h>
#include "cluon/OD4Session.hpp"
#include "cluon/UDPSender.hpp"
#include "cluon/UDPReceiver.hpp"
#include "cluon/Envelope.hpp"
#include "Messages.hpp"
#include <iostream>
#include <queue>

/********************************************************/
/** DON'T CHANGE STUFF BELOW THIS LINE. *****************/
/********************************************************/

static const int BROADCAST_CHANNEL = 250;
static const int DEFAULT_PORT = 50001;

static const int ANNOUNCE_PRESENCE = 1001;
static const int FOLLOW_REQUEST = 1002;
static const int FOLLOW_RESPONSE = 1003;
static const int STOP_FOLLOW = 1004;
static const int LEADER_STATUS = 2001;
static const int FOLLOWER_STATUS = 3001;

class V2VService {
public:
    std::map <std::string, std::string> presentCars;

    V2VService(std::string ip, std::string id, std::string partnerIp, std::string partnerId,
                           std::string speed_after, std::string left, std::string right, uint16_t queue_max);

    void announcePresence();
    void followRequest();
    void followResponse();
    void stopFollow(std::string vehicleIp);
    void leaderStatus(float speed, float steeringAngle, uint8_t distanceTraveled);
    void followerStatus();

private:
    static constexpr float m_OFFSET = -0.12f;
    std::string _IP;
    std::string _ID;
    std::string _PARTNER_IP;
    std::string _PARTNER_ID;
    std::string _SPEED_AFTER;
    std::string _LEFT;
    std::string _RIGHT;
    uint16_t _QUEUE_MAX;

    bool isPresentPartner = false;
    bool isFollower = false;
    bool isLeader = false;

    std::shared_ptr<cluon::OD4Session>  broadcast;
    std::shared_ptr<cluon::UDPReceiver> incoming;
    std::shared_ptr<cluon::UDPSender>   toLeader;
    std::shared_ptr<cluon::UDPSender>   toFollower;

    static uint32_t getTime();
    static std::pair<int16_t, std::string> extract(std::string data);
    template <class T>
    static std::string encode(T msg);
    template <class T>
    static T decode(std::string data);
};

#endif


