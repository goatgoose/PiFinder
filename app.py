from flask import Flask, render_template, request, redirect
import json
import datetime

app = Flask(__name__)


ips = []


@app.route('/', methods=["GET"])
def home():
    return redirect('/pifinder')


@app.route('/pifinder', methods=["GET"])
def pifinder():
    return render_template("pifinder.html")


@app.route('/update', methods=["GET"])
def update():
    if request.args.get("filter"):
        filter = request.args.get("filter")
        if filter:
            filter = filter.strip().lower()
            return json.dumps([ip_tuple for ip_tuple in ips if ip_tuple[0].lower().startswith(filter)])
    return json.dumps(ips)


@app.route('/add_ips', methods=["POST"])
def add_ip():
    identity = request.form["identity"]
    hostnames = [hostname for hostname in request.form["hostname"].split(",") if hostname != ""]
    macs = [mac for mac in request.form["mac"].split(",") if mac != ""]
    print(macs)
    mac = macs[1]
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
    ips.append((identity, hostnames, mac, now))
    return "ok"


if __name__ == '__main__':
    app.run()
